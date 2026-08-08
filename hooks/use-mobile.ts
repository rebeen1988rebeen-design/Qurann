import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== "undefined" && window.innerWidth) {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  })

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    let mql: MediaQueryList
    try {
      mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    } catch {
      return
    }

    const onChange = () => {
      setIsMobile(!!mql.matches)
    }

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else if ((mql as any).addListener) {
      (mql as any).addListener(onChange)
    }

    onChange()

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else if ((mql as any).removeListener) {
        (mql as any).removeListener(onChange)
      }
    }
  }, [])

  return isMobile
}

