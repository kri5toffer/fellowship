import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.cell.deleteMany();
  await prisma.row.deleteMany();
  await prisma.column.deleteMany();
  await prisma.table.deleteMany();
  await prisma.base.deleteMany();

  // =============================================
  // BASE 1: Cycling Team Manager
  // =============================================
  const cyclingBase = await prisma.base.create({
    data: {
      id: "base_cycling",
      baseName: "Cycling Team Manager",
      description: "Track riders, teams, and race results for the 2025 season",
      color: "#1d7c6a",
      displayOrder: 0,
    },
  });

  // --- Table 1: Riders ---
  await prisma.table.create({
    data: {
      id: "tbl_riders",
      tableName: "Riders",
      displayOrder: 0,
      baseId: cyclingBase.id,
      columns: {
        create: [
          { id: "col_rider_name",   columnName: "Name",        fieldType: "TEXT",     displayOrder: 0 },
          { id: "col_rider_team",   columnName: "Team",        fieldType: "TEXT",     displayOrder: 1 },
          { id: "col_rider_age",    columnName: "Age",         fieldType: "NUMBER",   displayOrder: 2 },
          { id: "col_rider_weight", columnName: "Weight (kg)", fieldType: "NUMBER",   displayOrder: 3 },
          { id: "col_rider_ftp",    columnName: "FTP (watts)", fieldType: "NUMBER",   displayOrder: 4 },
          { id: "col_rider_dob",    columnName: "DOB",         fieldType: "DATE",     displayOrder: 5 },
          { id: "col_rider_active", columnName: "Active",      fieldType: "CHECKBOX", displayOrder: 6 },
        ],
      },
    },
  });

  const riders = [
    { id: "row_pogacar",     name: "Tadej Pogacar",       team: "UAE Team Emirates",     age: "26", weight: "66", ftp: "418", dob: "1998-09-21", active: "true" },
    { id: "row_vingegaard",  name: "Jonas Vingegaard",     team: "Visma-Lease a Bike",    age: "28", weight: "60", ftp: "410", dob: "1996-12-10", active: "true" },
    { id: "row_evenepoel",   name: "Remco Evenepoel",      team: "Soudal-Quick Step",     age: "25", weight: "61", ftp: "405", dob: "2000-01-25", active: "true" },
    { id: "row_roglic",      name: "Primoz Roglic",        team: "Red Bull-BORA",         age: "35", weight: "65", ftp: "395", dob: "1989-10-29", active: "true" },
    { id: "row_vdpoel",      name: "Mathieu van der Poel", team: "Alpecin-Deceuninck",    age: "30", weight: "75", ftp: "390", dob: "1995-01-19", active: "true" },
    { id: "row_pidcock",     name: "Tom Pidcock",          team: "Q36.5 Pro Cycling",     age: "25", weight: "58", ftp: "385", dob: "1999-07-30", active: "true" },
    { id: "row_cavendish",   name: "Mark Cavendish",       team: "Retired",               age: "39", weight: "70", ftp: "340", dob: "1985-05-21", active: "false" },
    { id: "row_philipsen",   name: "Jasper Philipsen",     team: "Alpecin-Deceuninck",    age: "26", weight: "75", ftp: "355", dob: "1998-03-02", active: "true" },
  ];

  for (let i = 0; i < riders.length; i++) {
    const r = riders[i]!;
    await prisma.row.create({
      data: {
        id: r.id,
        tableId: "tbl_riders",
        displayOrder: i,
        cells: {
          create: [
            { id: `cel_${r.id}_name`,   columnId: "col_rider_name",   cellValue: r.name },
            { id: `cel_${r.id}_team`,   columnId: "col_rider_team",   cellValue: r.team },
            { id: `cel_${r.id}_age`,    columnId: "col_rider_age",    cellValue: r.age },
            { id: `cel_${r.id}_weight`, columnId: "col_rider_weight", cellValue: r.weight },
            { id: `cel_${r.id}_ftp`,    columnId: "col_rider_ftp",    cellValue: r.ftp },
            { id: `cel_${r.id}_dob`,    columnId: "col_rider_dob",    cellValue: r.dob },
            { id: `cel_${r.id}_active`, columnId: "col_rider_active", cellValue: r.active },
          ],
        },
      },
    });
  }

  // --- Table 2: Teams ---
  await prisma.table.create({
    data: {
      id: "tbl_teams",
      tableName: "Teams",
      displayOrder: 1,
      baseId: cyclingBase.id,
      columns: {
        create: [
          { id: "col_team_name",      columnName: "Team Name",       fieldType: "TEXT",     displayOrder: 0 },
          { id: "col_team_bike",      columnName: "Bike Brand",      fieldType: "TEXT",     displayOrder: 1 },
          { id: "col_team_groupset",  columnName: "Groupset",        fieldType: "TEXT",     displayOrder: 2 },
          { id: "col_team_riders",    columnName: "Roster Size",     fieldType: "NUMBER",   displayOrder: 3 },
          { id: "col_team_founded",   columnName: "Founded",         fieldType: "DATE",     displayOrder: 4 },
          { id: "col_team_worldtour", columnName: "WorldTour",       fieldType: "CHECKBOX", displayOrder: 5 },
        ],
      },
    },
  });

  const teams = [
    { id: "row_uae",     name: "UAE Team Emirates",    bike: "Colnago",     groupset: "Shimano Dura-Ace",   riders: "30", founded: "2017-01-01", wt: "true" },
    { id: "row_visma",   name: "Visma-Lease a Bike",   bike: "Cervelo",     groupset: "Shimano Dura-Ace",   riders: "29", founded: "2019-01-01", wt: "true" },
    { id: "row_soudal",  name: "Soudal-Quick Step",    bike: "Specialized", groupset: "SRAM Red",           riders: "28", founded: "2003-01-01", wt: "true" },
    { id: "row_bora",    name: "Red Bull-BORA",        bike: "Specialized", groupset: "Shimano Dura-Ace",   riders: "30", founded: "2010-01-01", wt: "true" },
    { id: "row_alpecin", name: "Alpecin-Deceuninck",   bike: "Canyon",      groupset: "SRAM Red",           riders: "27", founded: "2013-01-01", wt: "true" },
    { id: "row_q36",     name: "Q36.5 Pro Cycling",    bike: "De Rosa",     groupset: "Campagnolo Super Record", riders: "22", founded: "2022-01-01", wt: "false" },
    { id: "row_ineos",   name: "INEOS Grenadiers",     bike: "Pinarello",   groupset: "Shimano Dura-Ace",   riders: "30", founded: "2010-01-01", wt: "true" },
  ];

  for (let i = 0; i < teams.length; i++) {
    const t = teams[i]!;
    await prisma.row.create({
      data: {
        id: t.id,
        tableId: "tbl_teams",
        displayOrder: i,
        cells: {
          create: [
            { id: `cel_${t.id}_name`,     columnId: "col_team_name",      cellValue: t.name },
            { id: `cel_${t.id}_bike`,     columnId: "col_team_bike",      cellValue: t.bike },
            { id: `cel_${t.id}_groupset`, columnId: "col_team_groupset",  cellValue: t.groupset },
            { id: `cel_${t.id}_riders`,   columnId: "col_team_riders",    cellValue: t.riders },
            { id: `cel_${t.id}_founded`,  columnId: "col_team_founded",   cellValue: t.founded },
            { id: `cel_${t.id}_wt`,       columnId: "col_team_worldtour", cellValue: t.wt },
          ],
        },
      },
    });
  }

  // --- Table 3: Race Results ---
  await prisma.table.create({
    data: {
      id: "tbl_results",
      tableName: "Race Results",
      displayOrder: 2,
      baseId: cyclingBase.id,
      columns: {
        create: [
          { id: "col_result_rider",    columnName: "Rider",      fieldType: "TEXT",     displayOrder: 0 },
          { id: "col_result_race",     columnName: "Race",       fieldType: "TEXT",     displayOrder: 1 },
          { id: "col_result_position", columnName: "Position",   fieldType: "NUMBER",   displayOrder: 2 },
          { id: "col_result_date",     columnName: "Race Date",  fieldType: "DATE",     displayOrder: 3 },
          { id: "col_result_finished", columnName: "Finished",   fieldType: "CHECKBOX", displayOrder: 4 },
        ],
      },
    },
  });

  const results = [
    { id: "row_tdf_pog",    rider: "Tadej Pogacar",       race: "Tour de France 2025",    pos: "1",  date: "2025-07-20", fin: "true" },
    { id: "row_tdf_ving",   rider: "Jonas Vingegaard",     race: "Tour de France 2025",    pos: "2",  date: "2025-07-20", fin: "true" },
    { id: "row_tdf_even",   rider: "Remco Evenepoel",      race: "Tour de France 2025",    pos: "3",  date: "2025-07-20", fin: "true" },
    { id: "row_giro_pog",   rider: "Tadej Pogacar",       race: "Giro d'Italia 2025",     pos: "1",  date: "2025-06-01", fin: "true" },
    { id: "row_giro_rog",   rider: "Primoz Roglic",        race: "Giro d'Italia 2025",     pos: "2",  date: "2025-06-01", fin: "true" },
    { id: "row_vuelta_rog", rider: "Primoz Roglic",        race: "Vuelta a Espana 2025",   pos: "1",  date: "2025-09-14", fin: "true" },
    { id: "row_roubaix_vdp", rider: "Mathieu van der Poel", race: "Paris-Roubaix 2025",   pos: "1",  date: "2025-04-13", fin: "true" },
    { id: "row_ronde_vdp",  rider: "Mathieu van der Poel", race: "Tour of Flanders 2025", pos: "1",  date: "2025-04-06", fin: "true" },
    { id: "row_msr_phil",   rider: "Jasper Philipsen",     race: "Milan-San Remo 2025",   pos: "1",  date: "2025-03-22", fin: "true" },
    { id: "row_tdf_pid",    rider: "Tom Pidcock",          race: "Tour de France 2025",   pos: "15", date: "2025-07-20", fin: "true" },
  ];

  for (let i = 0; i < results.length; i++) {
    const r = results[i]!;
    await prisma.row.create({
      data: {
        id: r.id,
        tableId: "tbl_results",
        displayOrder: i,
        cells: {
          create: [
            { id: `cel_${r.id}_rider`,    columnId: "col_result_rider",    cellValue: r.rider },
            { id: `cel_${r.id}_race`,     columnId: "col_result_race",     cellValue: r.race },
            { id: `cel_${r.id}_position`, columnId: "col_result_position", cellValue: r.pos },
            { id: `cel_${r.id}_date`,     columnId: "col_result_date",     cellValue: r.date },
            { id: `cel_${r.id}_finished`, columnId: "col_result_finished", cellValue: r.fin },
          ],
        },
      },
    });
  }

  // =============================================
  // BASE 2: Project Tracker (demo second base)
  // =============================================
  const projectBase = await prisma.base.create({
    data: {
      id: "base_projects",
      baseName: "Project Tracker",
      description: "Track tasks and milestones",
      color: "#2563eb",
      displayOrder: 1,
    },
  });

  await prisma.table.create({
    data: {
      id: "tbl_tasks",
      tableName: "Tasks",
      displayOrder: 0,
      baseId: projectBase.id,
      columns: {
        create: [
          { id: "col_task_name",     columnName: "Task",      fieldType: "TEXT",     displayOrder: 0 },
          { id: "col_task_priority", columnName: "Priority",  fieldType: "NUMBER",   displayOrder: 1 },
          { id: "col_task_due",      columnName: "Due Date",  fieldType: "DATE",     displayOrder: 2 },
          { id: "col_task_done",     columnName: "Done",      fieldType: "CHECKBOX", displayOrder: 3 },
        ],
      },
    },
  });

  const tasks = [
    { id: "row_task1", name: "Design schema",        priority: "1", due: "2026-03-15", done: "true" },
    { id: "row_task2", name: "Build tRPC router",    priority: "1", due: "2026-03-16", done: "true" },
    { id: "row_task3", name: "Create UI components", priority: "2", due: "2026-03-18", done: "false" },
    { id: "row_task4", name: "Add filtering",        priority: "2", due: "2026-03-20", done: "false" },
  ];

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i]!;
    await prisma.row.create({
      data: {
        id: t.id,
        tableId: "tbl_tasks",
        displayOrder: i,
        cells: {
          create: [
            { id: `cel_${t.id}_name`,     columnId: "col_task_name",     cellValue: t.name },
            { id: `cel_${t.id}_priority`, columnId: "col_task_priority", cellValue: t.priority },
            { id: `cel_${t.id}_due`,      columnId: "col_task_due",      cellValue: t.due },
            { id: `cel_${t.id}_done`,     columnId: "col_task_done",     cellValue: t.done },
          ],
        },
      },
    });
  }

  console.log("Seeded 2 bases:");
  console.log("  Cycling Team Manager (3 tables: Riders, Teams, Race Results)");
  console.log("  Project Tracker (1 table: Tasks)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
