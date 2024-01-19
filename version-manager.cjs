/**
 * нужно только для контроля версий приложения
 *
 * Создает ветку на гитхабе для каждой версии
 * Если ветка уже есть, то ничего не происходит и просто выпадает ошибка в консоль
 * */

const pkg = require("./package.json")
const { execSync } = require("child_process")

module.exports = function(index, increment) {
  const versionParts = pkg.version.split(".")

  versionParts[index] = String(Number(versionParts[index]) + (increment ? 1 : -1))
  pkg.version = versionParts.join(".")

  // Записываем изменения в package.json
  require("fs")
    .writeFileSync("./package.json", JSON.stringify(pkg, null, 2))

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
