/**
 * нужно только для контроля версий приложения
 *
 * Создает ветку на гитхабе для каждой версии
 * Если ветка уже есть, то ничего не происходит и просто выпадает ошибка в консоль
 * */

const pkg = require("./package.json")
const { execSync } = require("child_process")

module.exports = function(semVerIndex, increment) {
  let versionParts = pkg.version.split(".")

  versionParts[semVerIndex] = String(Number(versionParts[semVerIndex]) + (increment ? 1 : -1))

  //при повышении мажорной версии, минор и патч будут уходить в 0
  if (increment) {
    versionParts = versionParts.map((semVer, index) => semVerIndex < index ? 0 : semVer)
  }

  pkg.version = versionParts.join(".")

  // Записываем изменения в package.json
  require("fs")
    .writeFileSync("./package.json", JSON.stringify(pkg, null, 2))

  // создаем новую ветку, только при увеличении версии
  if (increment) {
    // Создаем новую ветку и добавляем все файлы
    const branchName = `version${pkg.version}`
    const remoteBranchCheckCommand = `git ls-remote --exit-code origin ${branchName}`

    try {
      execSync(remoteBranchCheckCommand)
      console.error(`Branch '${branchName}' already exists on GitHub.`)
    } catch (error) {
      console.log(`Creating and pushing branch '${branchName}' to GitHub...`)
      execSync(`git checkout -b ${branchName}`)
      execSync("git add .")
      execSync(`git commit -m "Release version ${pkg.version}"`)
      execSync(`git push origin ${branchName}`)
      console.log(`Branch '${branchName}' created and pushed to GitHub.`)
    }
  }
}
