/**
 * Isystk Utility
 */
const Isystk = {
  randInt: (max: number, min: number = 0): number =>
    Math.floor(Math.random() * (max - min + 1) + min),

  // 8:18 & 9:19 の 'any' を修正
  isNumeric: (v: unknown): v is number => typeof v === 'number' && !isNaN(v) && isFinite(v),

  // 9:30 の 'Function' を修正
  isFunction: (v: unknown): v is (...args: unknown[]) => unknown => typeof v === 'function',

  addCssRule(rule: string): void {
    const style = document.createElement('style');
    document.head.appendChild(style);
    const sheet = style.sheet as CSSStyleSheet;
    sheet.insertRule(rule, sheet.cssRules.length);
  },
};

interface KaijiImg {
  zawa: string;
  kaiji: string;
}

interface KaijiSetting {
  url: string;
  img: KaijiImg;
}

/**
 * Kaiji Class
 */
export class Kaiji {
  private setting: KaijiSetting;

  constructor() {
    this.setting = {
      url: './',
      img: {
        zawa: 'images/zawa.jpg',
        kaiji: 'images/kaiji.png',
      },
    };
  }

  private getImage(name: keyof KaijiImg): string {
    return this.setting.url + this.setting.img[name];
  }

  public run(): void {
    let interval = 5000;
    const initInterval = interval;

    const execute = () => {
      if (interval > 400) {
        const loopCount = initInterval / interval;
        for (let i = 0; i < loopCount; i++) {
          this.zawazawa();
        }
        setTimeout(execute, interval);
        interval -= interval / 10;
      } else {
        this.zawazawa(() => {
          this.breakContents();
          this.showKaiji();
        });
      }
    };
    execute();
  }

  private zawazawa(callback?: () => void): void {
    const img = new Image();
    img.onload = () => {
      const top = Isystk.randInt(window.scrollY + window.innerHeight - img.height, window.scrollY);
      const left = Isystk.randInt(window.scrollX + window.innerWidth - img.width, window.scrollX);

      Object.assign(img.style, {
        top: `${top}px`,
        left: `${left}px`,
        display: 'block',
      });

      const anim = img.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: 'forwards',
      });

      anim.onfinish = () => {
        setTimeout(() => {
          const out = img.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 2000,
            fill: 'forwards',
          });
          out.onfinish = () => {
            img.remove();
            if (callback) callback();
          };
        }, 500);
      };
    };

    img.src = this.getImage('zawa');
    img.style.cssText = `
      position: absolute;
      z-index: 9999;
      border-radius: 20px;
      width: ${Isystk.randInt(256, 100)}px;
      display: none;
    `;
    document.body.appendChild(img);
  }

  private breakContents(): void {
    const targets = document.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, p, li, dt, dd, pre, aside, header, footer',
    );

    targets.forEach((el, i) => {
      const getRandomTransform = () => `
        translateX(${Isystk.randInt(window.innerWidth / 2, -window.innerWidth / 2)}px)
        translateY(${Isystk.randInt(window.innerHeight / 2, -window.innerHeight / 2)}px)
        rotateX(${Isystk.randInt(360, -360)}deg)
        rotateY(${Isystk.randInt(360, -360)}deg)
      `;

      const pos1 = getRandomTransform();
      const pos2 = getRandomTransform();
      const pos3 = getRandomTransform();

      el.style.transition = 'transform 3.0s cubic-bezier(0.61, -0.22, 0.55, 1.1)';
      el.style.transform = pos1;

      const keyframeName = `move${i}`;
      Isystk.addCssRule(`
        @keyframes ${keyframeName} {
          0%, 100% { transform: ${pos1}; }
          33% { transform: ${pos2}; }
          66% { transform: ${pos3}; }
        }
      `);

      el.addEventListener(
        'transitionend',
        () => {
          el.style.animation = `${keyframeName} 60s infinite linear`;
        },
        { once: true },
      );
    });

    const resetHandler = (e: Event): void => {
      e.preventDefault();
      targets.forEach((el) => {
        el.style.animation = '';
        el.style.transform = 'translate(0,0) rotate(0)';
      });

      const msg = document.querySelector<HTMLElement>('#kaijiMessage .marquee');
      if (msg) msg.textContent = 'See You!! '.repeat(5);

      setTimeout(() => {
        document.querySelectorAll('.kaiji').forEach((k) => {
          (k as HTMLElement).animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 3000,
          }).onfinish = () => k.remove();
        });
        document.body.removeEventListener('click', resetHandler);
      }, 3000);
    };
    document.body.addEventListener('click', resetHandler);
  }

  private showKaiji(): void {
    const img = new Image();
    img.className = 'kaiji';
    img.onload = () => {
      document.body.appendChild(img);
      img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 2000 }).onfinish = () => {
        img.style.display = 'block';
        this.createBalloon();
      };
    };
    img.src = this.getImage('kaiji');
    img.style.cssText = `
      position: absolute;
      display: none;
      z-index: 9999;
      width: 256px;
      top: ${window.scrollY + window.innerHeight - 300}px;
      left: ${window.scrollX + window.innerWidth - 250}px;
    `;
  }

  private createBalloon(): void {
    const balloon = document.createElement('div');
    balloon.id = 'kaijiMessage';
    balloon.className = 'kaiji';
    balloon.innerHTML = `
      <div class="textinner">
        <p class="marquee">XSSのセキュリティホールがあるようです。不具合の修正をお願いします！ クリックすると元に戻るよ</p>
      </div>
      <div class="triangle"></div>
    `;

    Isystk.addCssRule(`
      @keyframes marquee {
        from { transform: translateX(100%); }
        to { transform: translateX(-100%); }
      }
    `);

    Object.assign(balloon.style, {
      width: '250px',
      position: 'absolute',
      top: `${window.scrollY + window.innerHeight - 390}px`,
      left: `${window.scrollX + window.innerWidth - 390}px`,
      zIndex: '9999',
    });

    const inner = balloon.querySelector<HTMLElement>('.textinner');
    if (inner) {
      Object.assign(inner.style, {
        padding: '20px',
        backgroundColor: '#fff',
        border: '5px solid #000',
        borderRadius: '30px',
        overflow: 'hidden',
      });
    }

    const marquee = balloon.querySelector<HTMLElement>('.marquee');
    if (marquee) {
      Object.assign(marquee.style, {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        animation: 'marquee 10s linear infinite',
        fontSize: '20px',
      });
    }

    document.body.appendChild(balloon);
  }
}

/**
 * Execution
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Kaiji().run());
} else {
  new Kaiji().run();
}
