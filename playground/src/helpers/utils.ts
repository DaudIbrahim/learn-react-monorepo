export const timeoutPromise = (time = null, msg = 'PROMISE-RESOLVED-TRUE') => {
  const t = time ? time : (Math.floor(Math.random() * 10) + 1) * 1000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(msg)
    }, t)
  })
}
