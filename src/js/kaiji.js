/**
 * Isystk Utility
 */
const Isystk = {
	randInt: (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

	// 型判定（最新の標準メソッドを使用）
	isNumeric: (v) => !isNaN(v) && isFinite(v),
	isFunction: (v) => typeof v === 'function',

	// CSSルールの追加
	addCssRule(rule) {
		const style = document.createElement('style');
		document.head.appendChild(style);
		style.sheet.insertRule(rule, style.sheet.cssRules.length);
	}
};

/**
 * Kaiji Class
 */
class Kaiji {
	constructor() {
		this.setting = {
			url: '/',
			img: {
				zawa: './images/zawa.jpg',
				kaiji: './images/kaiji.png'
			}
		};
	}

	getImage(name) {
		return this.setting.url + this.setting.img[name];
	}

	run() {
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
				// 最終フェーズ
				this.zawazawa(() => {
					this.breakContents();
					this.showKaiji();
				});
			}
		};
		execute();
	}

	// 「ざわ」を表示
	zawazawa(callback) {
	  const img = new Image();
	  // 先にonloadを定義する
	  img.onload = () => {
		// 画像が読み込まれて初めて、正しい高さ・幅が取得できる
		const top = Isystk.randInt(window.scrollY, window.scrollY + window.innerHeight - img.height);
		const left = Isystk.randInt(window.scrollX, window.scrollX + window.innerWidth - img.width);

		img.style.top = `${top}px`;
		img.style.left = `${left}px`;
		img.style.display = 'block';

		// フェードイン開始
		const anim = img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 2000, fill: 'forwards' });

		anim.onfinish = () => {
		  setTimeout(() => {
			const out = img.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 2000, fill: 'forwards' });
			out.onfinish = () => {
			  img.remove();
			  if (callback) callback();
			};
		  }, 500);
		};
	  };

	  img.src = this.getImage('zawa'); // 最後にsrcを入れる
	  img.style.cssText = `
		position: absolute;
		z-index: 9999;
		border-radius: 20px;
		width: ${Isystk.randInt(256, 100)}px;
		display: none;
	  `;
	  document.body.appendChild(img);
	}

	// コンテンツ浮遊
	breakContents() {
		const targets = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, dt, dd, pre, aside, header, footer');

		targets.forEach((el, i) => {
			const rect = el.getBoundingClientRect();
			const getRandomTransform = () => `
        translateX(${Isystk.randInt(window.innerWidth, -window.innerWidth)}px)
        translateY(${Isystk.randInt(window.innerHeight, -window.innerHeight)}px)
        rotateX(${Isystk.randInt(360, -360)}deg)
        rotateY(${Isystk.randInt(360, -360)}deg)
      `;

			const pos1 = getRandomTransform();
			const pos2 = getRandomTransform();
			const pos3 = getRandomTransform();

			// 初期移動
			el.style.transition = 'transform 3.0s cubic-bezier(0.61, -0.22, 0.55, 1.1)';
			el.style.transform = pos1;

			// キーフレームアニメーション
			const keyframeName = `move${i}`;
			Isystk.addCssRule(`
        @keyframes ${keyframeName} {
          0%, 100% { transform: ${pos1}; }
          33% { transform: ${pos2}; }
          66% { transform: ${pos3}; }
        }
      `);

			el.addEventListener('transitionend', () => {
				el.style.animation = `${keyframeName} 60s infinite linear`;
			}, { once: true });
		});

		// クリックで復元
		const resetHandler = (e) => {
			e.preventDefault();
			targets.forEach(el => {
				el.style.animation = '';
				el.style.transform = 'translate(0,0) rotate(0)';
			});

			const msg = document.querySelector('#kaijiMessage .marquee');
			if (msg) msg.textContent = 'See You!! '.repeat(5);

			setTimeout(() => {
				document.querySelectorAll('.kaiji').forEach(k => {
					k.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 3000 }).onfinish = () => k.remove();
				});
				document.body.removeEventListener('click', resetHandler);
			}, 3000);
		};
		document.body.addEventListener('click', resetHandler);
	}

	// カイジ登場
	showKaiji() {
		const img = new Image();
		img.className = 'kaiji';
		img.src = this.getImage('kaiji');
		img.style.cssText = `
      position: absolute;
      display: none;
      z-index: 9999;
      width: 256px;
      top: ${window.scrollY + window.innerHeight - 300}px;
      left: ${window.scrollX + window.innerWidth - 250}px;
    `;

		img.onload = () => {
			document.body.appendChild(img);
			img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 2000 }).onfinish = () => {
				img.style.display = 'block';
				this.createBalloon();
			};
		};
	}

	createBalloon() {
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
			zIndex: '9999'
		});

		// スタイル適用（textinner等）
		const inner = balloon.querySelector('.textinner');
		Object.assign(inner.style, {
			padding: '20px',
			backgroundColor: '#fff',
			border: '5px solid #000',
			borderRadius: '30px',
			overflow: 'hidden'
		});

		const marquee = balloon.querySelector('.marquee');
		Object.assign(marquee.style, {
			whiteSpace: 'nowrap',
			display: 'inline-block',
			animation: 'marquee 10s linear infinite',
			fontSize: '20px'
		});

		document.body.appendChild(balloon);
	}
}
// kaiji.js の末尾

// クラス定義が終わった後に実行
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => new Kaiji().run());
} else {
	// すでにDOM読み込み済みの場合は即実行
	new Kaiji().run();
}
