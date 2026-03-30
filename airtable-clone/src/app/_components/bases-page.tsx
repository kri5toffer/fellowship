"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus, Home, Star, Share2, Users, BookOpen, ShoppingBag, Upload,
  ChevronDown, ChevronRight, Search, HelpCircle, Bell, Sparkles,
  LayoutGrid, ArrowUp, Table, X, Globe,
  MoreHorizontal, Edit, Copy, ArrowRight, UserPlus, Palette, Trash2,
} from "lucide-react";
import { api, type RouterOutputs } from "~/trpc/react";

type BaseItem = RouterOutputs["base"]["getAll"][number];

const BASE_COLORS = [
  "#1d7c6a", "#2d7ff9", "#8b46ff", "#ff08c2",
  "#f82b60", "#ff6f2c", "#fcb400", "#20c933",
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `Opened ${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `Opened ${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (mins > 0) return `Opened ${mins} minute${mins > 1 ? "s" : ""} ago`;
  return "Opened just now";
}

const ACTION_CARDS = [
  {
    icon: <Sparkles className="size-5" style={{ color: "rgb(221, 4, 168)" }} />,
    title: "Start with Omni",
    description: "Use AI to build a custom app tailored to your workflow",
  },
  {
    icon: <LayoutGrid className="size-5" style={{ color: "rgb(99, 73, 141)" }} />,
    title: "Start with templates",
    description: "Select a template to get started and customize as you go.",
  },
  {
    icon: <ArrowUp className="size-5" style={{ color: "rgb(13, 127, 120)" }} />,
    title: "Quickly upload",
    description: "Easily migrate your existing projects in just a few minutes.",
  },
  {
    icon: <Table className="size-5" style={{ color: "rgb(59, 102, 163)" }} />,
    title: "Build an app on your own",
    description: "Start with a blank app and build your ideal workflow.",
  },
];

export function BasesPage() {
  const { data: bases, isLoading } = api.base.getAll.useQuery();
  const utils = api.useUtils();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [renamingBaseId, setRenamingBaseId] = useState<string | null>(null);
  const [renameBaseValue, setRenameBaseValue] = useState("");
  const [starredOpen, setStarredOpen] = useState(true);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const createBase = api.base.create.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) => {
        const tempBase: BaseItem = {
          id: `temp-${Date.now()}`,
          baseName: variables.baseName,
          color: variables.color ?? "#2d7ff9",
          description: variables.description ?? null,
          displayOrder: (old?.length ?? 0) * 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdById: null,
        };
        return [...(old ?? []), tempBase];
      });
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => { void utils.base.getAll.invalidate(); },
    onSuccess: () => {
      setShowCreateModal(false);
    },
  });

  const renameBase = api.base.update.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) =>
        (old ?? []).map((b) => b.id === variables.id ? { ...b, baseName: variables.baseName ?? b.baseName } : b),
      );
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => { void utils.base.getAll.invalidate(); },
    onSuccess: () => { setRenamingBaseId(null); setRenameBaseValue(""); },
  });

  const deleteBase = api.base.delete.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) =>
        (old ?? []).filter((b) => b.id !== variables.id),
      );
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => { void utils.base.getAll.invalidate(); },
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuOpenId && !target.closest('[data-menu-container]')) {
        setMenuOpenId(null);
      }
    };

    if (menuOpenId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenId]);

  const baseList = bases ?? [];

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* ── Top Navbar ── */}
      <header
        className="flex shrink-0 items-center bg-white"
        style={{
          height: "56px",
          boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
          zIndex: 20,
        }}
      >
        <nav className="flex w-full items-center pl-[4px] pr-[8px]">
          {/* Left: sidebar toggle + logo */}
          <div className="flex flex-1 items-center">
            <button
              type="button"
              className="flex items-center rounded pl-0.5 pr-1 py-1 text-[rgb(29,31,37)] hover:opacity-70"
              aria-label="Collapse sidebar"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
              >
                <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <Link href="/" className="flex items-center rounded p-[6px] mr-0.5 focus-visible:outline-none">
              <svg width="102" height="22.2" viewBox="0 0 680 148" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: "geometricPrecision" }}>
                <g>
                  <path fill="#4d4d4d" d="M272.8495 85.1981L261.0145 53.2891C260.5305 51.9841 258.6855 51.9841 258.2015 53.2891L246.3655 85.1981C246.0025 86.1781 246.7275 87.2201 247.7725 87.2201L271.4435 87.2201C272.4885 87.2201 273.2125 86.1781 272.8495 85.1981M278.3175 103.1321L240.8985 103.1321C240.2705 103.1321 239.7095 103.5221 239.4915 104.1101L232.1245 123.9641C231.9065 124.5521 231.3455 124.9421 230.7185 124.9421L214.5015 124.9421C213.4395 124.9421 212.7135 123.8691 213.1095 122.8841L250.4505 29.8621C250.6785 29.2941 251.2295 28.9211 251.8425 28.9211L267.3725 28.9211C267.9845 28.9211 268.5365 29.2941 268.7645 29.8621L306.1055 122.8831C306.5015 123.8691 305.7755 124.9421 304.7135 124.9421L288.4965 124.9421C287.8695 124.9421 287.3085 124.5521 287.0905 123.9641L279.7235 104.1101C279.5055 103.5221 278.9445 103.1321 278.3175 103.1321M313.7043 61.5684L327.5763 61.5684C328.4053 61.5684 329.0763 62.2404 329.0763 63.0684L329.0763 123.4424C329.0763 124.2704 328.4053 124.9424 327.5763 124.9424L313.7043 124.9424C312.8763 124.9424 312.2043 124.2704 312.2043 123.4424L312.2043 63.0684C312.2043 62.2404 312.8763 61.5684 313.7043 61.5684M379.6682 76.2549C379.6682 77.0829 378.9962 77.7549 378.1682 77.7549L377.7482 77.7549C370.8892 77.7549 365.8582 79.4009 362.6582 82.6929 359.4562 85.9849 357.8572 91.4269 357.8572 99.0169L357.8572 123.4429C357.8572 124.2709 357.1862 124.9429 356.3572 124.9429L342.6222 124.9429C341.7942 124.9429 341.1222 124.2709 341.1222 123.4429L341.1222 63.0679C341.1222 62.2399 341.7942 61.5679 342.6222 61.5679L356.2202 61.5679C357.0492 61.5679 357.7202 62.2399 357.7202 63.0679L357.7202 75.0109 357.9952 75.0109C359.6412 70.0729 362.2472 66.2799 365.8142 63.6259 369.3802 60.9749 373.7702 59.6479 378.9822 59.6479L379.6682 59.6479 379.6682 76.2549zM417.5974 75.6973C416.7694 75.6973 416.0974 76.3693 416.0974 77.1973L416.0974 102.3093C416.0974 104.8703 416.5984 106.6983 417.6064 107.7963 418.6114 108.8933 420.3494 109.4423 422.8184 109.4423L424.1994 109.4423C425.0274 109.4423 425.6994 110.1133 425.6994 110.9423L425.6994 123.5793C425.6994 124.4083 425.0274 125.0793 424.1994 125.0793L418.2914 125.0793C412.1644 125.0793 407.4554 123.5023 404.1634 120.3473 400.8704 117.1923 399.2244 112.5073 399.2244 106.2873L399.2244 77.1973C399.2244 76.3693 398.5534 75.6973 397.7244 75.6973L389.0654 75.6973C388.2364 75.6973 387.5654 75.0253 387.5654 74.1973L387.5654 63.0683C387.5654 62.2403 388.2364 61.5683 389.0654 61.5683L397.7244 61.5683C398.5534 61.5683 399.2244 60.8973 399.2244 60.0683L399.2244 37.6913C399.2244 36.8633 399.8964 36.1913 400.7244 36.1913L414.5974 36.1913C415.4254 36.1913 416.0974 36.8633 416.0974 37.6913L416.0974 60.0683C416.0974 60.8973 416.7694 61.5683 417.5974 61.5683L427.6284 61.5683C428.4574 61.5683 429.1284 62.2403 429.1284 63.0683L429.1284 74.1973C429.1284 75.0253 428.4574 75.6973 427.6284 75.6973L417.5974 75.6973zM481.1191 106.1499C484.2741 102.8579 485.8511 98.5599 485.8511 93.2549 485.8511 87.9529 484.2741 83.6529 481.1191 80.3609 477.9641 77.0689 473.8251 75.4229 468.7041 75.4229 463.5821 75.4229 459.4461 77.0689 456.2901 80.3609 453.1361 83.6529 451.5581 87.9529 451.5581 93.2549 451.5581 98.5599 453.1361 102.8579 456.2901 106.1499 459.4461 109.4419 463.5821 111.0879 468.7041 111.0879 473.8251 111.0879 477.9641 109.4419 481.1191 106.1499M449.0891 123.0219C444.4251 120.3709 440.7431 116.5059 438.0471 111.4309 435.3481 106.3559 434.0001 100.2979 434.0001 93.2549 434.0001 86.2149 435.3481 80.1549 438.0471 75.0799 440.7431 70.0049 444.4251 66.1429 449.0891 63.4889 453.7531 60.8369 458.8731 59.5109 464.4521 59.5109 469.3901 59.5109 473.6191 60.4709 477.1411 62.3919 480.6601 64.3119 483.4721 67.0099 485.5771 70.4849L485.8511 70.4849 485.8511 63.0679C485.8511 62.2399 486.5231 61.5679 487.3511 61.5679L501.0861 61.5679C501.9151 61.5679 502.5861 62.2399 502.5861 63.0679L502.5861 123.4419C502.5861 124.2709 501.9151 124.9419 501.0861 124.9419L487.3511 124.9419C486.5231 124.9419 485.8511 124.2709 485.8511 123.4419L485.8511 116.0259 485.5771 116.0259C483.4721 119.5029 480.6601 122.1989 477.1411 124.1189 473.6191 126.0399 469.3901 126.9999 464.4521 126.9999 458.8731 126.9999 453.7531 125.6729 449.0891 123.0219M559.709 106.1499C562.864 102.8579 564.441 98.5599 564.441 93.2549 564.441 87.9529 562.864 83.6529 559.709 80.3609 556.555 77.0689 552.416 75.4229 547.295 75.4229 542.173 75.4229 538.036 77.0689 534.881 80.3609 531.727 83.6529 530.148 87.9529 530.148 93.2549 530.148 98.5599 531.727 102.8579 534.881 106.1499 538.036 109.4419 542.173 111.0879 547.295 111.0879 552.416 111.0879 556.555 109.4419 559.709 106.1499M538.859 124.1189C535.338 122.1989 532.525 119.5029 530.423 116.0259L530.148 116.0259 530.148 123.4419C530.148 124.2709 529.477 124.9419 528.648 124.9419L514.776 124.9419C513.948 124.9419 513.276 124.2709 513.276 123.4419L513.276 30.4209C513.276 29.5929 513.948 28.9209 514.776 28.9209L528.648 28.9209C529.477 28.9209 530.148 29.5929 530.148 30.4209L530.148 70.4849 530.423 70.4849C532.525 67.0099 535.338 64.3119 538.859 62.3919 542.379 60.4709 546.609 59.5109 551.548 59.5109 557.125 59.5109 562.247 60.8369 566.911 63.4889 571.575 66.1429 575.255 70.0049 577.953 75.0799 580.649 80.1549 582 86.2149 582 93.2549 582 100.2979 580.649 106.3559 577.953 111.4309 575.255 116.5059 571.575 120.3709 566.911 123.0219 562.247 125.6729 557.125 126.9999 551.548 126.9999 546.609 126.9999 542.379 126.0399 538.859 124.1189M605.3721 124.9424L591.5001 124.9424C590.6711 124.9424 590.0001 124.2704 590.0001 123.4424L590.0001 30.4214C590.0001 29.5934 590.6711 28.9214 591.5001 28.9214L605.3721 28.9214C606.2001 28.9214 606.8721 29.5934 606.8721 30.4214L606.8721 123.4424C606.8721 124.2704 606.2001 124.9424 605.3721 124.9424M638.0937 76.2461C635.7937 78.0401 634.2407 80.6301 633.4367 84.0181 633.2157 84.9521 633.9447 85.8481 634.9047 85.8481L661.3047 85.8481C662.2207 85.8481 662.9407 85.0281 662.7927 84.1241 662.2647 80.9191 660.8907 78.3631 658.6697 76.4521 656.0637 74.2121 652.6557 73.0911 648.4497 73.0911 644.2427 73.0911 640.7897 74.1431 638.0937 76.2461M671.9067 68.3581C677.3017 74.2571 679.9997 82.6031 679.9997 93.3921L679.9997 95.1841C679.9997 96.0131 679.3287 96.6841 678.4997 96.6841L634.3957 96.6841C633.4637 96.6841 632.7497 97.5321 632.9107 98.4501 633.6157 102.4581 635.3887 105.6421 638.2307 108.0011 641.4757 110.7001 645.5697 112.0481 650.5077 112.0481 656.8827 112.0481 662.7837 109.5601 668.2097 104.5831 668.8727 103.9751 669.9237 104.1041 670.4377 104.8421L677.1817 114.5221C677.6157 115.1451 677.5237 116.0051 676.9517 116.5051 673.6437 119.4011 669.9947 121.8261 666.0077 123.7761 661.6187 125.9241 656.4507 127.0001 650.5077 127.0001 643.6497 127.0001 637.6577 125.6041 632.5377 122.8161 627.4147 120.0281 623.4377 116.0951 620.6047 111.0191 617.7687 105.9441 616.3517 100.0691 616.3517 93.3921 616.3517 86.7181 617.7237 80.8201 620.4667 75.6971 623.2097 70.5771 627.0507 66.5991 631.9897 63.7631 636.9277 60.9301 642.6887 59.5111 649.2737 59.5111 658.9647 59.5111 666.5097 62.4601 671.9067 68.3581M330.8866 39.2473C330.8866 44.9063 326.2996 49.4933 320.6406 49.4933 314.9816 49.4933 310.3936 44.9063 310.3936 39.2473 310.3936 33.5883 314.9816 29.0013 320.6406 29.0013 326.2996 29.0013 330.8866 33.5883 330.8866 39.2473" />
                  <path fill="#FCB400" d="M78.9992,1.8675 L13.0402,29.1605 C9.3722,30.6785 9.4102,35.8885 13.1012,37.3515 L79.3362,63.6175 C85.1562,65.9255 91.6372,65.9255 97.4562,63.6175 L163.6922,37.3515 C167.3822,35.8885 167.4212,30.6785 163.7522,29.1605 L97.7942,1.8675 C91.7762,-0.6225 85.0162,-0.6225 78.9992,1.8675" />
                  <path fill="#18BFFF" d="M94.2726,77.9608 L94.2726,143.5768 C94.2726,146.6978 97.4196,148.8348 100.3206,147.6848 L174.1266,119.0368 C175.8116,118.3688 176.9166,116.7408 176.9166,114.9288 L176.9166,49.3128 C176.9166,46.1918 173.7696,44.0548 170.8686,45.2048 L97.0626,73.8528 C95.3786,74.5208 94.2726,76.1488 94.2726,77.9608" />
                  <path fill="#F82B60" d="M77.0384,81.3464 L55.1344,91.9224 L52.9104,92.9974 L6.6724,115.1524 C3.7414,116.5664 0.0004,114.4304 0.0004,111.1744 L0.0004,49.5884 C0.0004,48.4104 0.6044,47.3934 1.4144,46.6274 C1.7524,46.2884 2.1354,46.0094 2.5334,45.7884 C3.6384,45.1254 5.2144,44.9484 6.5544,45.4784 L76.6704,73.2594 C80.2344,74.6734 80.5144,79.6674 77.0384,81.3464" />
                  <path fill="rgba(0,0,0,0.25)" d="M77.0384,81.3464 L55.1344,91.9224 L1.4144,46.6274 C1.7524,46.2884 2.1354,46.0094 2.5334,45.7884 C3.6384,45.1254 5.2144,44.9484 6.5544,45.4784 L76.6704,73.2594 C80.2344,74.6734 80.5144,79.6674 77.0384,81.3464" />
                </g>
              </svg>
            </Link>
          </div>

          {/* Center: search */}
          <div className="flex justify-center">
            <button
              type="button"
              className="flex w-[400px] items-center rounded-full bg-white px-[16px] text-[13px]"
              style={{
                height: "32px",
                boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Search className="size-4 shrink-0 text-[rgb(97,102,112)]" style={{ flex: "0 0 auto" }} />
              <span className="ml-[8px] flex-auto text-left text-[13px] leading-[19.5px] text-[rgb(97,102,112)]">Search...</span>
              <span className="text-[13px] leading-[19.5px] text-[rgb(151,154,160)]">⌘ K</span>
            </button>
          </div>

          {/* Right: help, notifications, account */}
          <div className="flex flex-1 items-center justify-end">
            {/* Help */}
            <button
              type="button"
              className="flex items-center gap-1 rounded px-2 py-1 text-[13px] text-[rgb(29,31,37)] hover:opacity-70"
              aria-label="Help menu"
            >
              <HelpCircle className="size-4" />
              <span>Help</span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="relative flex items-center rounded-full"
              style={{ height: "28px", width: "28px", margin: "0 0.75rem" }}
              aria-label="Notifications"
            >
              <div
                className="flex shrink-0 items-center justify-center rounded-full"
                style={{
                  height: "28px",
                  width: "28px",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <Bell className="size-4 text-[rgb(29,31,37)]" />
              </div>
            </button>

            {/* Account */}
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-teal-500 text-[13px] font-semibold text-white"
              style={{
                height: "28px",
                width: "28px",
                boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
              }}
              aria-label="Account"
            >
              C
            </button>
          </div>
        </nav>
      </header>

      {/* ── Body: sidebar + main ── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[300px] shrink-0 flex-col border-r border-[rgba(0,0,0,0.1)] bg-white transition-all duration-[85ms] ease-in-out">
          <nav className="flex-1 overflow-y-auto p-3">
            {/* Home — active */}
            <Link
              href="/"
              className="mb-1 flex items-center rounded-[3px] bg-[rgb(242,244,248)] text-[15px] font-medium text-[rgb(29,31,37)] hover:bg-[rgb(242,244,248)] no-underline"
              style={{ padding: "8px 0 8px 8px", height: "40px" }}
            >
              <Home className="size-5 shrink-0" />
              <span className="grow truncate pl-2 leading-[22.5px]">Home</span>
            </Link>

            {/* Starred */}
            <div className="mb-1">
              <button
                type="button"
                onClick={() => setStarredOpen(!starredOpen)}
                className="flex w-full items-center rounded-[3px] text-[15px] font-medium text-[rgb(29,31,37)] hover:bg-[rgb(242,244,248)]"
                style={{ padding: "8px 0 8px 8px", height: "40px" }}
              >
                <Star className="size-5 shrink-0" />
                <span className="grow truncate pl-2 leading-[22.5px] text-left">Starred</span>
                <ChevronDown className={`size-4 text-gray-400 transition-transform ${starredOpen ? "" : "-rotate-90"}`} />
              </button>
              {starredOpen && (
                <div className="mb-1 ml-9 pr-3">
                  <p className="text-[11px] leading-snug text-gray-400">
                    Your starred bases, interfaces, and workspaces will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Shared */}
            <a
              href="#"
              className="mb-1 flex items-center rounded-[3px] text-[15px] font-medium text-[rgb(29,31,37)] no-underline hover:bg-[rgb(242,244,248)]"
              style={{ padding: "8px 0 8px 8px", height: "40px" }}
            >
              <Share2 className="size-5 shrink-0" />
              <span className="grow truncate pl-2 leading-[22.5px]">Shared</span>
            </a>

            {/* Workspaces */}
            <button
              type="button"
              className="mb-1 flex w-full items-center rounded-[3px] text-[15px] font-medium text-[rgb(29,31,37)] hover:bg-[rgb(242,244,248)]"
              style={{ padding: "8px 0 8px 8px", height: "40px" }}
            >
              <Users className="size-5 shrink-0" />
              <span className="grow truncate pl-2 leading-[22.5px] text-left">Workspaces</span>
              <div className="flex items-center gap-0.5 text-gray-400">
                <Plus className="size-4" />
                <ChevronRight className="size-4" />
              </div>
            </button>
          </nav>

          {/* Bottom */}
          <div className="p-3" style={{ borderTop: "1px solid rgba(0,0,0,0.1)", marginBottom: "18px" }}>
            <a
              href="#"
              className="mb-1 flex items-center rounded-[3px] text-[13px] leading-[19.5px] font-normal text-[rgb(29,31,37)] no-underline hover:bg-[rgb(242,244,248)]"
              style={{ height: "32px", padding: "0 8px" }}
            >
              <BookOpen className="size-5 shrink-0" />
              <span className="grow truncate pl-2">Templates and apps</span>
            </a>
            <a
              href="#"
              className="mb-1 flex items-center rounded-[3px] text-[13px] leading-[19.5px] font-normal text-[rgb(29,31,37)] no-underline hover:bg-[rgb(242,244,248)]"
              style={{ height: "32px", padding: "0 8px" }}
            >
              <ShoppingBag className="size-5 shrink-0" />
              <span className="grow truncate pl-2">Marketplace</span>
            </a>
            <a
              href="#"
              className="mb-1 flex items-center rounded-[3px] text-[13px] leading-[19.5px] font-normal text-[rgb(29,31,37)] no-underline hover:bg-[rgb(242,244,248)]"
              style={{ height: "32px", padding: "0 8px" }}
            >
              <Globe className="size-5 shrink-0" />
              <span className="grow truncate pl-2">Import</span>
            </a>
            <div>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="flex w-full items-center justify-center rounded-[6px] border-0 text-white font-medium focus-visible:outline-none"
                style={{
                  backgroundColor: "rgb(22, 110, 225)",
                  boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)",
                  padding: "0 8px",
                  marginTop: "16px",
                  marginBottom: "8px",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: 500,
                  lineHeight: "22px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 3px rgba(0, 0, 0, 0.11), 0px 1px 4px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)";
                }}
              >
                <Plus 
                  className="flex-none" 
                  style={{ 
                    width: "16px", 
                    height: "16px", 
                    marginRight: "0.25rem",
                    shapeRendering: "geometricPrecision",
                  }} 
                />
                <span className="truncate no-select" style={{ userSelect: "none" }}>
                  Create
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main 
          className="flex flex-1 flex-col overflow-y-auto px-[48px] pt-[32px]"
          style={{ maxWidth: "1920px", backgroundColor: "rgb(249, 250, 251)" }}
        >
          <h1
            className="mt-0 text-left text-[rgb(29,31,37)]"
            style={{
              fontSize: "27px",
              fontWeight: 675,
              lineHeight: "33.75px",
              letterSpacing: "-0.16px",
              paddingBottom: "24px",
              fontFamily: '"Inter Display", -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            }}
          >
            Home
          </h1>

          {/* Upgrade banner */}
          {showUpgradeBanner && (
            <div className="relative mb-5 rounded-lg bg-white px-5 py-[18px] shadow-sm">
              <button
                type="button"
                onClick={() => setShowUpgradeBanner(false)}
                className="absolute right-2 top-2 rounded p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="size-4" />
              </button>

              <div className="pl-1">
                <h2 className="mb-1 text-[15px] font-semibold leading-snug text-gray-900">
                  Upgrade to the Team plan before your trial expires in{" "}
                  <span className="text-blue-600">6 days</span>
                </h2>
                <p className="mb-4 text-[13px] leading-relaxed text-gray-600">
                  Keep the power you need to manage complex workflows, design interfaces, and more.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-[13px] font-medium text-white shadow-sm hover:bg-gray-800"
                  >
                    <Sparkles className="size-3.5" />
                    Upgrade
                  </button>
                  <button type="button" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-100">
                    <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                    Compare plans
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4 Action cards */}
          <div className="mb-[24px] flex flex-col">
            <div>
              <div className="mt-[4px]" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {ACTION_CARDS.map((card) => (
                  <div key={card.title}>
                    <button
                      type="button"
                      className="flex h-full cursor-pointer flex-col items-start rounded-[6px] bg-white p-[16px] text-left transition-shadow focus-visible:outline-none"
                      style={{
                        boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0px 0px 1px 0px rgba(0, 0, 0, 0.48), 0px 0px 2px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)";
                      }}
                      aria-label={`Create a base with ${card.title}`}
                    >
                      <div className="flex items-center">
                        <div className="flex-none">{card.icon}</div>
                        <h2 className="ml-[8px] text-[15px] leading-[18.75px] text-[rgb(29,31,37)]" style={{ fontWeight: 600 }}>
                          {card.title}
                        </h2>
                      </div>
                      <p className="mt-[4px] text-left text-[13px] leading-[19.5px] text-[rgb(97,102,112)]">
                        {card.description}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opened anytime header - with sticky positioning */}
          <div 
            className="relative z-[5] shrink-0"
            style={{ 
              paddingBottom: "10px", 
              marginBottom: "-10px" 
            }}
          >
            <div className="relative z-[1] mb-[16px] flex items-center justify-between whitespace-nowrap">
              <div className="mr-[8px] flex items-center">
                <div className="mr-[24px] flex items-center">
                  <button 
                    type="button" 
                    className="flex items-center justify-between gap-[4px] rounded focus-visible:outline-none"
                    aria-label="Filter items"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <div className="mr-[4px]">
                      <p className="text-[15px] leading-[22.5px] text-[rgb(29,31,37)]" style={{ fontWeight: 400 }}>
                        Opened anytime
                      </p>
                    </div>
                    <ChevronDown className="size-4 flex-none" style={{ shapeRendering: "geometricPrecision" }} />
                  </button>
                </div>
              </div>
              <div className="flex">
                <div role="radiogroup" className="flex items-center">
                  <button
                    type="button"
                    role="radio"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-[4px] focus-visible:outline-none"
                    aria-checked="false"
                    aria-label="View items in a list"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 flex-none"
                    >
                      <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-[4px] focus-visible:outline-none"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    aria-checked="true"
                    aria-label="View items in a grid"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 flex-none"
                    >
                      <rect x="4" y="4" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                      <rect x="11.5" y="4" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                      <rect x="4" y="11.5" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                      <rect x="11.5" y="11.5" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div 
              className="absolute left-0 top-0 h-full w-full overflow-hidden"
              style={{ 
                paddingBottom: "10px", 
                marginBottom: "-10px" 
              }}
            >
              <div className="h-full w-full"></div>
            </div>
          </div>

          {/* Base cards */}
          {isLoading ? (
            <div className="py-12 text-center text-sm text-[rgb(97,102,112)]">Loading...</div>
          ) : baseList.length === 0 ? (
            <div className="py-12 text-center text-sm text-[rgb(97,102,112)]">No bases yet — click Create to get started</div>
          ) : (
            <div 
              role="rowgroup" 
              className="flex-auto overflow-y-auto px-[4px]" 
              style={{ minHeight: "500px" }}
            >
              {(() => {
                const now = new Date();
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const sevenDaysAgo = new Date(todayStart);
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const todayBases = baseList.filter(b => new Date(b.updatedAt) >= todayStart);
                const past7DaysBases = baseList.filter(b => {
                  const date = new Date(b.updatedAt);
                  return date < todayStart && date >= sevenDaysAgo;
                });
                const earlierBases = baseList.filter(b => new Date(b.updatedAt) < sevenDaysAgo);

                return (
                  <>
                    {/* Today section */}
                    {todayBases.length > 0 && (
                      <div className="mb-[24px] w-full">
                        <h4 className="mb-[8px] text-[13px] font-medium leading-[16.25px] text-[rgb(97,102,112)]">
                          Today
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(286px, 1fr))", gap: "16px" }}>
                        {todayBases.map((base) => (
                          <div key={base.id}>
                            {renamingBaseId === base.id ? (
                              <div
                                className="relative flex cursor-pointer overflow-hidden rounded-[6px] bg-white"
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div
                                  className="flex shrink-0 items-center justify-center"
                                  style={{ width: "92px", height: "92px", minWidth: "92px" }}
                                >
                                  <div
                                    className="flex items-center justify-center text-white"
                                    style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}
                                  >
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {renameBaseValue.slice(0, 2).toUpperCase() || base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <input
                                    autoFocus
                                    value={renameBaseValue}
                                    onChange={(e) => setRenameBaseValue(e.target.value)}
                                    onBlur={() => {
                                      if (renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      else { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      if (e.key === "Escape") { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    className="truncate rounded border border-blue-400 px-2 py-1 text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)] outline-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={`/base/${base.id}`}
                                className="group relative flex cursor-pointer rounded-[6px] bg-white transition-shadow hover:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.48),0px_0px_2px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
                                role="region"
                                aria-label={base.baseName}
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div
                                  className="flex shrink-0 items-center justify-center overflow-hidden rounded-l-[6px]"
                                  aria-hidden="true"
                                  style={{ width: "92px", height: "92px", minWidth: "92px" }}
                                >
                                  <div
                                    className="flex items-center justify-center text-white"
                                    style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}
                                  >
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-auto">
                                      <Link
                                        href={`/base/${base.id}`}
                                        className="flex flex-auto flex-grow-0 items-center text-left"
                                      >
                                        <h3 className="truncate text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)]">
                                          {base.baseName}
                                        </h3>
                                      </Link>
                                    </div>

                                    {/* Menu button and dropdown */}
                                    <div
                                      className={`absolute right-0 top-0 z-[1] mr-[10px] mt-[10px] flex items-center gap-[4px] transition-opacity ${menuOpenId === base.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                                      data-menu-container
                                    >
                                      <button
                                        onClick={(e) => { e.preventDefault(); }}
                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]"
                                        title="Favourite"
                                      >
                                        <Star className="size-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setMenuOpenId(menuOpenId === base.id ? null : base.id);
                                        }}
                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]"
                                        style={{
                                          backgroundColor: menuOpenId === base.id ? "rgb(59, 130, 246)" : "transparent",
                                          color: menuOpenId === base.id ? "white" : undefined,
                                        }}
                                        title="More options"
                                      >
                                        <MoreHorizontal className="size-4" />
                                      </button>

                                      {/* Dropdown menu */}
                                      {menuOpenId === base.id && (
                                        <div
                                          className="absolute left-0 top-[32px] z-[100] w-[250px] rounded-[6px] bg-white py-[8px]"
                                          style={{
                                            boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.16), 0px 3px 4px rgba(0, 0, 0, 0.06), 0px 6px 8px rgba(0, 0, 0, 0.06), 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 18px 32px rgba(0, 0, 0, 0.06)",
                                          }}
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {/* Rename */}
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setRenamingBaseId(base.id);
                                              setRenameBaseValue(base.baseName);
                                              setMenuOpenId(null);
                                            }}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Edit className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Rename</span>
                                          </button>

                                          {/* Duplicate */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Copy className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Duplicate</span>
                                          </button>

                                          {/* Move */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <ArrowRight className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Move</span>
                                          </button>

                                          {/* Go to workspace */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <UserPlus className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Go to workspace</span>
                                          </button>

                                          {/* Customize appearance */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Palette className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Customize appearance</span>
                                          </button>

                                          {/* Divider */}
                                          <div className="my-[8px] h-[1px] bg-[rgb(229,233,240)]" />

                                          {/* Delete */}
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              if (confirm(`Are you sure you want to delete "${base.baseName}"?`)) {
                                                deleteBase.mutate({ id: base.id });
                                                setMenuOpenId(null);
                                              }
                                            }}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-red-600 hover:bg-red-50"
                                          >
                                            <Trash2 className="size-4" />
                                            <span>Delete</span>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-[4px] flex items-center">
                                    <div className="truncate text-[11px] leading-[16.5px] text-[rgb(97,102,112)]">
                                      <div className="flex items-center">
                                        <div
                                          className="relative z-[2] truncate"
                                          role="button"
                                          tabIndex={0}
                                          title={base.updatedAt.toLocaleString()}
                                        >
                                          {timeAgo(base.updatedAt)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    )}

                    {/* Past 7 days section */}
                    {past7DaysBases.length > 0 && (
                      <div className="mb-[24px] w-full">
                        <h4 className="mb-[8px] text-[13px] font-medium leading-[16.25px] text-[rgb(97,102,112)]">
                          Past 7 days
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(286px, 1fr))", gap: "16px" }}>
                        {past7DaysBases.map((base) => (
                          <div key={base.id}>
                            {renamingBaseId === base.id ? (
                              <div
                                className="relative flex cursor-pointer overflow-hidden rounded-[6px] bg-white"
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div
                                  className="flex shrink-0 items-center justify-center"
                                  style={{ width: "92px", height: "92px", minWidth: "92px" }}
                                >
                                  <div
                                    className="flex items-center justify-center text-white"
                                    style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}
                                  >
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {renameBaseValue.slice(0, 2).toUpperCase() || base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <input
                                    autoFocus
                                    value={renameBaseValue}
                                    onChange={(e) => setRenameBaseValue(e.target.value)}
                                    onBlur={() => {
                                      if (renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      else { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      if (e.key === "Escape") { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    className="truncate rounded border border-blue-400 px-2 py-1 text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)] outline-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={`/base/${base.id}`}
                                className="group relative flex cursor-pointer rounded-[6px] bg-white transition-shadow hover:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.48),0px_0px_2px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
                                role="region"
                                aria-label={base.baseName}
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div
                                  className="flex shrink-0 items-center justify-center overflow-hidden rounded-l-[6px]"
                                  aria-hidden="true"
                                  style={{ width: "92px", height: "92px", minWidth: "92px" }}
                                >
                                  <div
                                    className="flex items-center justify-center text-white"
                                    style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}
                                  >
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-auto">
                                      <Link
                                        href={`/base/${base.id}`}
                                        className="flex flex-auto flex-grow-0 items-center text-left"
                                      >
                                        <h3 className="truncate text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)]">
                                          {base.baseName}
                                        </h3>
                                      </Link>
                                    </div>

                                    {/* Menu button and dropdown */}
                                    <div
                                      className={`absolute right-0 top-0 z-[1] mr-[10px] mt-[10px] flex items-center gap-[4px] transition-opacity ${menuOpenId === base.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                                      data-menu-container
                                    >
                                      <button
                                        onClick={(e) => { e.preventDefault(); }}
                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]"
                                        title="Favourite"
                                      >
                                        <Star className="size-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setMenuOpenId(menuOpenId === base.id ? null : base.id);
                                        }}
                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]"
                                        style={{
                                          backgroundColor: menuOpenId === base.id ? "rgb(59, 130, 246)" : "transparent",
                                          color: menuOpenId === base.id ? "white" : undefined,
                                        }}
                                        title="More options"
                                      >
                                        <MoreHorizontal className="size-4" />
                                      </button>

                                      {/* Dropdown menu */}
                                      {menuOpenId === base.id && (
                                        <div
                                          className="absolute left-0 top-[32px] z-[100] w-[250px] rounded-[6px] bg-white py-[8px]"
                                          style={{
                                            boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.16), 0px 3px 4px rgba(0, 0, 0, 0.06), 0px 6px 8px rgba(0, 0, 0, 0.06), 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 18px 32px rgba(0, 0, 0, 0.06)",
                                          }}
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {/* Rename */}
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setRenamingBaseId(base.id);
                                              setRenameBaseValue(base.baseName);
                                              setMenuOpenId(null);
                                            }}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Edit className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Rename</span>
                                          </button>

                                          {/* Duplicate */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Copy className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Duplicate</span>
                                          </button>

                                          {/* Move */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <ArrowRight className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Move</span>
                                          </button>

                                          {/* Go to workspace */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <UserPlus className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Go to workspace</span>
                                          </button>

                                          {/* Customize appearance */}
                                          <button
                                            onClick={(e) => e.preventDefault()}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"
                                          >
                                            <Palette className="size-4 text-[rgb(97,102,112)]" />
                                            <span>Customize appearance</span>
                                          </button>

                                          {/* Divider */}
                                          <div className="my-[8px] h-[1px] bg-[rgb(229,233,240)]" />

                                          {/* Delete */}
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              if (confirm(`Are you sure you want to delete "${base.baseName}"?`)) {
                                                deleteBase.mutate({ id: base.id });
                                                setMenuOpenId(null);
                                              }
                                            }}
                                            className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-red-600 hover:bg-red-50"
                                          >
                                            <Trash2 className="size-4" />
                                            <span>Delete</span>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-[4px] flex items-center">
                                    <div className="truncate text-[11px] leading-[16.5px] text-[rgb(97,102,112)]">
                                      <div className="flex items-center">
                                        <div
                                          className="relative z-[2] truncate"
                                          role="button"
                                          tabIndex={0}
                                          title={base.updatedAt.toLocaleString()}
                                        >
                                          {timeAgo(base.updatedAt)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    )}

                    {/* Earlier section */}
                    {earlierBases.length > 0 && (
                      <div className="mb-[24px] w-full">
                        <h4 className="mb-[8px] text-[13px] font-medium leading-[16.25px] text-[rgb(97,102,112)]">
                          Earlier
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(286px, 1fr))", gap: "16px" }}>
                        {earlierBases.map((base) => (
                          <div key={base.id}>
                            {renamingBaseId === base.id ? (
                              <div
                                className="relative flex cursor-pointer overflow-hidden rounded-[6px] bg-white"
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div className="flex shrink-0 items-center justify-center" style={{ width: "92px", height: "92px", minWidth: "92px" }}>
                                  <div className="flex items-center justify-center text-white" style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}>
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {renameBaseValue.slice(0, 2).toUpperCase() || base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <input
                                    autoFocus
                                    value={renameBaseValue}
                                    onChange={(e) => setRenameBaseValue(e.target.value)}
                                    onBlur={() => {
                                      if (renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      else { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                                      if (e.key === "Escape") { setRenamingBaseId(null); setRenameBaseValue(""); }
                                    }}
                                    className="truncate rounded border border-blue-400 px-2 py-1 text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)] outline-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={`/base/${base.id}`}
                                className="group relative flex cursor-pointer rounded-[6px] bg-white transition-shadow hover:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.48),0px_0px_2px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
                                role="region"
                                aria-label={base.baseName}
                                style={{
                                  height: "92px",
                                  boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)",
                                  zIndex: menuOpenId === base.id ? 20 : undefined,
                                }}
                              >
                                <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-l-[6px]" aria-hidden="true" style={{ width: "92px", height: "92px", minWidth: "92px" }}>
                                  <div className="flex items-center justify-center text-white" style={{ backgroundColor: base.color, width: "56px", height: "56px", borderRadius: "12px" }}>
                                    <span style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.2 }}>
                                      {base.baseName.slice(0, 2).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="mr-[16px] flex flex-auto flex-col justify-center text-left">
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-auto">
                                      <Link href={`/base/${base.id}`} className="flex flex-auto flex-grow-0 items-center text-left">
                                        <h3 className="truncate text-[13px] font-medium leading-[19.5px] text-[rgb(29,31,37)]">{base.baseName}</h3>
                                      </Link>
                                    </div>
                                    <div className={`absolute right-0 top-0 z-[1] mr-[10px] mt-[10px] flex items-center gap-[4px] transition-opacity ${menuOpenId === base.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} data-menu-container>
                                      <button onClick={(e) => { e.preventDefault(); }} className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]" title="Favourite">
                                        <Star className="size-4" />
                                      </button>
                                      <button
                                        onClick={(e) => { e.preventDefault(); setMenuOpenId(menuOpenId === base.id ? null : base.id); }}
                                        className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[rgb(97,102,112)] hover:bg-[rgb(244,246,249)] hover:text-[rgb(29,31,37)]"
                                        style={{ backgroundColor: menuOpenId === base.id ? "rgb(59, 130, 246)" : "transparent", color: menuOpenId === base.id ? "white" : undefined }}
                                        title="More options"
                                      >
                                        <MoreHorizontal className="size-4" />
                                      </button>
                                      {menuOpenId === base.id && (
                                        <div className="absolute left-0 top-[32px] z-[100] w-[250px] rounded-[6px] bg-white py-[8px]" style={{ boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)" }} onClick={(e) => e.preventDefault()}>
                                          <button onClick={(e) => { e.preventDefault(); setRenamingBaseId(base.id); setRenameBaseValue(base.baseName); setMenuOpenId(null); }} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"><Edit className="size-4 text-[rgb(97,102,112)]" /><span>Rename</span></button>
                                          <button onClick={(e) => e.preventDefault()} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"><Copy className="size-4 text-[rgb(97,102,112)]" /><span>Duplicate</span></button>
                                          <button onClick={(e) => e.preventDefault()} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"><ArrowRight className="size-4 text-[rgb(97,102,112)]" /><span>Move</span></button>
                                          <button onClick={(e) => e.preventDefault()} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"><UserPlus className="size-4 text-[rgb(97,102,112)]" /><span>Go to workspace</span></button>
                                          <button onClick={(e) => e.preventDefault()} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-[rgb(29,31,37)] hover:bg-[rgb(244,246,249)]"><Palette className="size-4 text-[rgb(97,102,112)]" /><span>Customize appearance</span></button>
                                          <div className="my-[8px] h-[1px] bg-[rgb(229,233,240)]" />
                                          <button onClick={(e) => { e.preventDefault(); if (confirm(`Are you sure you want to delete "${base.baseName}"?`)) { deleteBase.mutate({ id: base.id }); setMenuOpenId(null); } }} className="flex w-full items-center gap-[12px] px-[16px] py-[8px] text-left text-[15px] text-red-600 hover:bg-red-50"><Trash2 className="size-4" /><span>Delete</span></button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-[4px] flex items-center">
                                    <div className="truncate text-[11px] leading-[16.5px] text-[rgb(97,102,112)]">
                                      <div className="flex items-center">
                                        <div className="relative z-[2] truncate" role="button" tabIndex={0} title={base.updatedAt.toLocaleString()}>
                                          {timeAgo(base.updatedAt)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </main>
      </div>

      {/* ── Create base modal ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div 
            className="relative mx-auto flex flex-col overflow-hidden rounded-[12px] bg-white col-12 animate-in fade-in duration-200"
            role="dialog"
            style={{ 
              width: "752px",
              boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Header */}
            <div className="flex flex-col justify-end border-b py-[36px]" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
              <h2 className="ml-[40px] text-[23px] font-bold leading-[1.2] text-[rgb(29,31,37)]">
                How do you want to start?
              </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col p-[40px]">
              <div className="flex gap-[40px]">
                {/* Build with Omni card */}
                <button
                  type="button"
                  className="flex flex-col rounded-[6px] cursor-pointer focus-visible:outline-none transition-shadow"
                  style={{ 
                    width: "340px",
                    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 3px rgba(0, 0, 0, 0.11), 0px 1px 4px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)";
                  }}
                  onClick={() => {
                    // Generate untitled base name
                    const existingUntitled = baseList.filter(b => 
                      b.baseName.toLowerCase().startsWith('untitled base')
                    );
                    const baseName = existingUntitled.length === 0 
                      ? "Untitled base"
                      : `Untitled base ${existingUntitled.length + 1}`;
                    
                    createBase.mutate({
                      baseName,
                      color: "#8b46ff",
                    });
                  }}
                >
                  <div 
                    className="relative flex w-full flex-col items-center justify-end rounded-t-[6px]"
                    style={{ height: "200px" }}
                  >
                    <img
                      src="https://static.airtable.com/images/Fast App Setup/Omni_2x.png"
                      alt="Build an app with Omni"
                      className="h-full w-full rounded-t-[6px]"
                      style={{ objectFit: "cover", aspectRatio: "1.7 / 1" }}
                    />
                  </div>
                  <div className="p-[16px]">
                    <div className="mb-[8px] flex items-center">
                      <h2 className="text-[21px] font-bold leading-[1.2] text-[rgb(29,31,37)]">
                        Build an app with Omni
                      </h2>
                      <div className="ml-[8px] inline-flex flex-none items-center rounded-full bg-[#e0f2fe] px-[8px] text-[11px] text-[#0369a1]">
                        New
                      </div>
                    </div>
                    <span className="text-[15px] leading-[18.2px] text-[rgb(97,102,112)]">
                      Use AI to build a custom app tailored to your workflow.
                    </span>
                  </div>
                </button>

                {/* Build on your own card */}
                <button
                  type="button"
                  className="flex flex-col rounded-[6px] cursor-pointer focus-visible:outline-none transition-shadow"
                  style={{ 
                    width: "340px",
                    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 3px rgba(0, 0, 0, 0.11), 0px 1px 4px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)";
                  }}
                  onClick={() => {
                    // Generate untitled base name
                    const existingUntitled = baseList.filter(b => 
                      b.baseName.toLowerCase().startsWith('untitled base')
                    );
                    const baseName = existingUntitled.length === 0 
                      ? "Untitled base"
                      : `Untitled base ${existingUntitled.length + 1}`;
                    
                    createBase.mutate({
                      baseName,
                      color: BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)]!,
                    });
                  }}
                >
                  <div 
                    className="relative flex w-full flex-col items-center justify-end rounded-t-[6px]"
                    style={{ height: "200px" }}
                  >
                    <img
                      src="https://static.airtable.com/images/Fast App Setup/start-with-data.png"
                      alt="Build an app on your own"
                      className="h-full w-full rounded-t-[6px]"
                      style={{ objectFit: "cover", aspectRatio: "1.7 / 1" }}
                    />
                  </div>
                  <div className="p-[16px]">
                    <div className="mb-[8px] flex items-center">
                      <h2 className="text-[21px] font-bold leading-[1.2] text-[rgb(29,31,37)]">
                        Build an app on your own
                      </h2>
                    </div>
                    <span className="text-[15px] leading-[18.2px] text-[rgb(97,102,112)]">
                      Start with a blank app and build your ideal workflow.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              className="absolute right-0 top-0 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] focus-visible:outline-none"
              style={{ width: "24px", height: "24px", marginTop: "24px", marginRight: "24px" }}
              onClick={() => setShowCreateModal(false)}
              aria-label="Close dialog"
            >
              <X className="size-4 text-[rgb(97,102,112)]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
