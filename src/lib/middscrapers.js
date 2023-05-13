import { Scraper as directoryScraper } from "directory.js";
import { Scraper as departmentScraper } from "departments.js";

export async function getDirectoryInfo({ email }) {
  const S = new directoryScraper(email);
  await S.init();
  const info = S.person;
  if (!info) {
    throw new Error("User not found in directory");
  }
  return info;
}

export async function getDepartmentList({ season }) {
  const prefixChar = " ";

  const S = new departmentScraper(season, prefixChar);

  await S.init();

  const {departments} = S;

  //build list of departments from department names
  const departmentList = departments.map((department) => {
    return department.name;
  });

  return departmentList;
}
