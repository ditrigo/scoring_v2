export const testFiedls = [
  {
    test: "test from api",
    risk: "Средний риск",
  },
]

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(testFiedls)
    }, 500)
  })

export default {
  fetchAll,
}
