console.log('Client is loaded')

function handleHMR(): void {
  console.log('Handling HMR')
  // update route.data on HMR updates of active page
  if (import.meta.hot) {
    // hot reload pageData
    import.meta.hot.on('dewpress:pageData', (payload) => {
      console.log('HMR!', payload)
      if (shouldHotReload(payload)) {
        console.log('should reload')
        location.reload();
        // router.route.data = payload.pageData
      }
    })
  }
}

function shouldHotReload(payload: any): boolean {
  const payloadPath = payload.path.replace(/(\bindex)?\.md$/, '')
  const locationPath = location.pathname.replace(/(\bindex)?\.html$/, '')

  return payloadPath === locationPath
}

handleHMR();
