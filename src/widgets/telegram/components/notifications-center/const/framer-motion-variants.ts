export const variants = {
  container: {
    open: {
      y: 0,
      width: 'min(50ch, 70ch)',
      height: 'auto',
      opacity: 1
    },
    closed: {
      y: -100,
      height: 0,
      opacity: 0
    }
  },
  // used to stagger item animation when switching from closed to open and vice versa
  content: {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          stiffness: 1000,
          velocity: -100
        }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  }
}
