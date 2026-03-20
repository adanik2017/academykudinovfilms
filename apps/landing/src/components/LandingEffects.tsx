'use client'

import { useEffect } from 'react'

export function LandingEffects() {
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768
    let pageVisible = true

    // Visibility
    const visHandler = () => { pageVisible = !document.hidden }
    document.addEventListener('visibilitychange', visHandler)

    // Scroll progress bar
    const progressBar = document.getElementById('scrollProgress')
    const heroContent = document.querySelector('.hero-content') as HTMLElement | null
    const scrollHandler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      if (progressBar) progressBar.style.width = (y / h * 100) + '%'
      if (heroContent && y < window.innerHeight) {
        const p = y / window.innerHeight
        heroContent.style.transform = `translateY(${-p * 80}px)`
        heroContent.style.opacity = String(Math.max(0, 1 - p * 1.5))
      }
    }
    if (!isMobile) window.addEventListener('scroll', scrollHandler, { passive: true })

    // Scroll reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            revealObserver.unobserve(e.target)
          }
        })
      },
      { threshold: isMobile ? 0.05 : 0.15, rootMargin: isMobile ? '0px 0px 50px 0px' : '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    // Animated counters (stats bar)
    let countersAnimated = false
    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !countersAnimated) {
            countersAnimated = true
            document.querySelectorAll('[data-count]').forEach((el) => {
              const target = parseInt((el as HTMLElement).dataset.count || '0')
              const suffix = target >= 40 ? '+' : ''
              const dur = 1200
              const start = performance.now()
              function tick(now: number) {
                const p = Math.min((now - start) / dur, 1)
                el.textContent = Math.round(easeOutCubic(p) * target) + suffix
                if (p < 1) requestAnimationFrame(tick)
              }
              requestAnimationFrame(tick)
            })
          }
        })
      },
      { threshold: 0.5 },
    )
    const statsBar = document.querySelector('[data-stats]')
    if (statsBar) statsObserver.observe(statsBar)

    // 3D card tilt
    const tiltHandlers: Array<{ el: Element; enter: () => void; move: (e: Event) => void; leave: () => void }> = []
    if (!isMobile) {
      document.querySelectorAll('.card-cinema').forEach((card) => {
        let ticking = false
        const el = card as HTMLElement
        const enter = () => {
          el.style.transition = 'transform .35s cubic-bezier(.23,1,.32,1),box-shadow .5s'
          el.style.transform = 'perspective(1000px) translateZ(6px)'
        }
        const move = (e: Event) => {
          if (ticking) return; ticking = true
          const me = e as MouseEvent
          requestAnimationFrame(() => {
            const r = el.getBoundingClientRect()
            const px = (me.clientX - r.left) / r.width
            const py = (me.clientY - r.top) / r.height
            el.style.transition = 'transform .06s linear'
            el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg) translateZ(8px)`
            ticking = false
          })
        }
        const leave = () => {
          el.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1),box-shadow .5s'
          el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
        }
        card.addEventListener('mouseenter', enter)
        card.addEventListener('mousemove', move)
        card.addEventListener('mouseleave', leave)
        tiltHandlers.push({ el: card, enter, move, leave })
      })
    }

    // Hero particles (Canvas 2D)
    let heroRaf: number
    const heroCanvas = document.getElementById('heroParticles') as HTMLCanvasElement | null
    if (heroCanvas && !isMobile) {
      const ctx = heroCanvas.getContext('2d')!
      let pw: number, ph: number
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      function resize() {
        const r = heroCanvas!.parentElement!.getBoundingClientRect()
        pw = r.width; ph = r.height
        heroCanvas!.width = pw * dpr; heroCanvas!.height = ph * dpr
        heroCanvas!.style.width = pw + 'px'; heroCanvas!.style.height = ph + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      resize()
      window.addEventListener('resize', resize)

      interface Mote { x: number; y: number; vx: number; vy: number; r: number; a: number; phase: number; sp: number; warm: boolean }
      const motes: Mote[] = []
      for (let i = 0; i < 20; i++) {
        motes.push({
          x: Math.random() * 2000, y: Math.random() * 1200,
          vx: (Math.random() - 0.5) * 0.12, vy: -0.08 - 0.12 * Math.random(),
          r: 0.3 + Math.random() * 1.8, a: 0.1 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2, sp: 0.002 + Math.random() * 0.005,
          warm: Math.random() > 0.4,
        })
      }

      let frame = 0
      function draw() {
        if (!pageVisible) { heroRaf = requestAnimationFrame(draw); return }
        frame++
        if (frame % 2 !== 0) { heroRaf = requestAnimationFrame(draw); return }
        ctx.clearRect(0, 0, pw, ph)
        const t = performance.now() * 0.001
        motes.forEach((m) => {
          m.x += m.vx + Math.sin(m.phase + t * 0.5) * 0.04
          m.y += m.vy
          m.phase += m.sp
          if (m.y < -20) { m.y = ph + 20; m.x = Math.random() * pw }
          if (m.x < -20) m.x = pw + 20
          if (m.x > pw + 20) m.x = -20
          const flicker = 0.3 + Math.sin(m.phase * 3 + t * 2) * 0.7
          const a = m.a * flicker
          ctx.fillStyle = m.warm ? `rgba(255,200,140,${a})` : `rgba(200,220,255,${a * 0.5})`
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill()
        })
        heroRaf = requestAnimationFrame(draw)
      }
      draw()
    }

    return () => {
      document.removeEventListener('visibilitychange', visHandler)
      window.removeEventListener('scroll', scrollHandler)
      if (heroRaf) cancelAnimationFrame(heroRaf)
      revealObserver.disconnect()
      statsObserver.disconnect()
      tiltHandlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return null
}
