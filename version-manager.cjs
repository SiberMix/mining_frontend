/**
 * нужно только для контроля версий приложения
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
  execSync(`git checkout -b ${branchName}`)
  execSync("git add .")
  execSync(`git commit -m "Release version ${pkg.version}"`)
}
