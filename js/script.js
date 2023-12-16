const videos = document.querySelectorAll('video');

videos.forEach((video) => {
	video.setAttribute('pip', 'false'); // Яндекс
	video.defaultMuted = true;
	video.addEventListener('onloadeddata ', () => {
		video.play();
	});
});

// =============== body overflow =============== //
const $body = document.querySelector('body');
let scrollPosition = 0;

const bodyOverflow = {
	enabled: true,
	enable() {
		$body.style.removeProperty('overflow');
		$body.style.removeProperty('position');
		$body.style.removeProperty('top');
		$body.style.removeProperty('width');
		window.scrollTo(0, scrollPosition);
		this.enabled = true;
	},
	disable() {
		scrollPosition = window.scrollY;
		$body.style.overflow = 'hidden';
		$body.style.position = 'fixed';
		$body.style.top = `-${scrollPosition}px`;
		$body.style.width = '100%';
		this.enabled = false;
	},
	toggle() {
		console.log(this.enabled);
		if (this.enabled) {
			this.disable();
		} else {
			this.enable();
		}
	},
};

// =============== body overflow =============== //
///
///
///
// =============== Свайпер =============== //
swiper1 = new Swiper('.swiper.titiland_photo', {
	pagination: {
		el: '.titiland .swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.titiland__arr-right',
		prevEl: '.titiland__arr-left',
	},

	freeMode: false,
	loop: true,
	allowTouchMove: true,
	speed: 1000,

	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
});

swiper2 = new Swiper('.swiper.titiland_text', {
	spaceBetween: 20,

	effect: 'fade',
	freeMode: false,
	speed: 600,
	allowTouchMove: false,
});

const slideHandler = () => {
	const dir = swiper1.realIndex;

	swiper2.slideToLoop(dir);
};

swiper1.on('slideChange', slideHandler);

// =============== Свайпер =============== //
///
///
///
// =============== Стрелка на первом экране =============== //
$('.arrow-content').bind('click', () => {
	$('html, body').animate(
		{
			scrollTop: $('.about').offset().top - 100,
		},
		1000
	);
});
// =============== Стрелка на первом экране =============== //
///
///
///
// =============== Popup 404 show =============== //
const er404_blocks = document.querySelectorAll('.er_404');
const popup404 = document.querySelector('.popup404');

er404_blocks.forEach((item) => {
	item.addEventListener('click', openPopupFunc);
});

function openPopupFunc(e) {
	popup404.classList.add('open');
	bodyOverflow.disable();
	e.preventDefault();
}
// =============== Popup 404 show =============== //
///
///
///
// =============== Popup 404 hide =============== //
const close_btns = document.querySelectorAll('.popup__close-btn');
const popup_email = document.querySelector('.email-accept');

const hidePopup = (e) => {
	popup404.classList.remove('open');
	popup_email.classList.remove('open');
	bodyOverflow.enable();
	e.preventDefault();
};

popup404.addEventListener('click', (e) => {
	if (!e.target.closest('.popup__content')) {
		hidePopup(e);
	}
});

popup_email.addEventListener('click', (e) => {
	if (!e.target.closest('.popup__content')) {
		hidePopup(e);
	}
});

close_btns.forEach((item) => {
	item.addEventListener('click', hidePopup);
});
// =============== Popup 404 hide =============== //
///
///
///
// =============== Паралакс =============== //
const moon = document.querySelector('.moon');
const moon_bg = document.querySelector('.moon-bg');
const collider_images = document.querySelectorAll('.swiper img');
const lines = document.querySelectorAll('.lines');

document.addEventListener('mousemove', paralaks);

function paralaks(e) {
	if (window.matchMedia('screen and (min-width: 780px)').matches) {
		let offsetX = (e.clientX / window.innerWidth) * 12 - 6;
		let offsetY = (e.clientY / window.innerHeight) * 12 - 6;

		const setOffset = (element, ofX, ofY) => {
			element?.setAttribute(
				'style',
				'transform: translate(' + ofX + 'px, ' + ofY + 'px);'
			);
		};

		setOffset(moon, offsetX, offsetY);
		setOffset(moon_bg, -offsetX, -offsetY);
		collider_images.forEach((el) => {
			setOffset(el, offsetX, offsetY);
		});
		lines.forEach((el) => {
			setOffset(el, offsetX * 3, offsetY * 3);
		});
	}
}
// =============== Паралакс =============== //
///
///
///
// =============== Клик по логотипу =============== //
document.querySelectorAll('.logo').forEach((logo) =>
	logo.addEventListener('click', () => {
		let scroll_to = $('body').offset().top;
		if ($('html, body').is(':animated')) return;
		if (window.scrollY == scroll_to) return;

		$('html, body').animate(
			{
				scrollTop: scroll_to,
			},
			1000
		);
	})
);
// =============== Клик по логотипу =============== //
///
///
///
///////////////////// Тык по меню скролл /////////////////////
const scrollLinks = document.querySelectorAll('[data-scroll]');

const onMenuClick = (name) => {
	let scroll_to = $('body').find(`[data-to='${name}']`).offset().top - 180;
	if ($('html, body').is(':animated')) return;
	if (window.scrollY == Math.floor(scroll_to)) return;

	$('html, body').animate(
		{
			scrollTop: scroll_to,
		},
		1000
	);
	removeMenuOpened();
};

scrollLinks.forEach((el) => {
	el.addEventListener('click', () => onMenuClick(el.dataset.scroll));
});
///////////////////// Тык по меню скролл /////////////////////
///
///
///
///////////////////// Анимация /////////////////////
const anim_items = document.querySelectorAll('.anim');

if (anim_items.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	async function animOnScroll() {
		anim_items.forEach((item) => {
			let scrollY = window.scrollY || document.documentElement.scrollTop;

			let anim_item_height = item.offsetHeight;
			let anim_item_offsetY = item.getBoundingClientRect().top + scrollY;
			let anim_start = 4;

			let anim_item_point = window.innerHeight - anim_item_height / anim_start;
			if (anim_item_height > window.innerHeight) {
				anim_item_point = anim_item_height - window.innerHeight / anim_start;
			}

			if (
				scrollY > anim_item_offsetY - anim_item_point &&
				scrollY < anim_item_offsetY + anim_item_height
			) {
				item.classList.add('_active');
			} else {
				item.classList.remove('_active');
			}
		});
	}
	animOnScroll();
}
///////////////////// Анимация /////////////////////
///
///
///
///////////////////// Бургер /////////////////////
const menu = document.querySelector('.menu');
const toggle = document.querySelector('.burger');
const header = document.querySelector('.header');

toggle.addEventListener('click', function (e) {
	this.classList.toggle('opened');
	menu.classList.toggle('opened');
	header.classList.toggle('opened');

	bodyOverflow.toggle();
});

function removeMenuOpened() {
	toggle.classList.remove('opened');
	menu.classList.remove('opened');
	header.classList.remove('opened');
	bodyOverflow.enable();
}
///////////////////// Бургер /////////////////////
///
///
///
///////////////////// отправление почты /////////////////////
const email = document.querySelector('input');
const form_btn = document.querySelector('.form__btn');
const email_popup = document.querySelector('.email-accept');

function emailTest(value) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}

form_btn.addEventListener('click', (e) => {
	e.preventDefault();

	if (emailTest(email.value)) {
		email_popup.classList.add('open');
		$.ajax(`send.php/?email=${email.value}`).then(() => (email.value = ''));
	} else {
		email.classList.add('error');
		$('.form__item span').addClass('error');
	}
});

email.addEventListener('focus', () => {
	email.classList.remove('error');
	$('.form__item span').removeClass('error');
});
///////////////////// отправление почты /////////////////////
///
///
///
///////////////////// Убрать куки /////////////////////
const cookie_btn = document.querySelector('.cookie__btn');
const cookiewin = document.querySelector('.cookie');

cookie_btn.addEventListener('click', (e) => {
	cookiewin.classList.add('cookie--hide');

	let date = new Date();
	date.setDate(date.getDate() + 3);
	document.cookie = 'cookiecook=no; path=/; expires=' + date.toUTCString();
});

// функция возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

let cookiecook = getCookie('cookiecook');

// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
if (cookiecook != 'no' || cookiecook == null) {
	cookiewin.classList.remove('cookie--hide');
}
///////////////////// Убрать куки /////////////////////
///
///
///
///////////////// mititocen hover /////////////////
const statsWrapper = document.querySelector('.stats');
const [defaultStatsButton, miningStatsButton] = document.querySelectorAll('.stats__tab');
const [defaultBarButton, miningBarButton] =
	document.querySelectorAll('.distribution__bar');

const defaultActivate = () => {
	statsWrapper.classList.remove('_mining');
	defaultStatsButton.classList.add('_active');
	defaultBarButton.classList.add('_active');
	miningStatsButton.classList.remove('_active');
	miningBarButton.classList.remove('_active');
};

const miningActivate = () => {
	statsWrapper.classList.add('_mining');
	defaultStatsButton.classList.remove('_active');
	defaultBarButton.classList.remove('_active');
	miningStatsButton.classList.add('_active');
	miningBarButton.classList.add('_active');
};

defaultStatsButton.addEventListener('click', defaultActivate);
defaultBarButton.addEventListener('click', defaultActivate);
miningStatsButton.addEventListener('click', miningActivate);
miningBarButton.addEventListener('click', miningActivate);

const stats_hover_items = document.querySelectorAll('.stats__item');
const circle_hover_items = document.querySelectorAll('.unit');

const defaultStatsImage = document.querySelector('.stats__circle');
const defaultStatsValue = defaultStatsImage.querySelector('.stats__value');

const miningStatsImage = document.querySelector('.stats__circle._mining');
const miningStatsValue = miningStatsImage.querySelector('.stats__value');

const getNumberFromElement = (el) => {
	return +el.innerHTML.trim().replace(/[ %]/g, '').replace(/,/g, '.');
};

const hoverMititocen = (item) => {
	let num;
	let percent;

	for (let i = 1; i <= stats_hover_items.length; i++) {
		let checkNum = '_' + i;
		if (item.classList.contains(checkNum)) {
			num = checkNum;
			break;
		}

		checkNum = '_1' + i;
		if (item.classList.contains(checkNum)) {
			num = checkNum;
			break;
		}
	}

	for (let i = 0; i < stats_hover_items.length; i++) {
		const hovered_item = stats_hover_items[i];
		if (hovered_item.classList.contains(num)) {
			percent = getNumberFromElement(hovered_item.querySelector('.stats__percent'));
		}
	}

	let baseValue;
	let statsValue;
	let statsImage;

	if (/^_1\d$/.test(num)) {
		baseValue = getNumberFromElement(miningStatsValue);
		statsValue = miningStatsValue;
		statsImage = miningStatsImage;
	} else {
		baseValue = getNumberFromElement(defaultStatsValue);
		statsValue = defaultStatsValue;
		statsImage = defaultStatsImage;
	}

	item.addEventListener('mouseenter', () => {
		if (item.classList.contains(num)) {
			statsImage.classList.add(num);
			statsValue.innerHTML = Math.round((baseValue * percent) / 100).toLocaleString(
				'ru-RU'
			);

			stats_hover_items.forEach((el) => {
				if (el.classList.contains(num)) el.classList.add('hovered');
			});
		}
	});
	item.addEventListener('mouseleave', () => {
		if (item.classList.contains(num)) {
			statsImage.classList.remove(num);
			statsValue.innerHTML = baseValue.toLocaleString('ru-RU');

			stats_hover_items.forEach((el) => {
				if (el.classList.contains(num)) el.classList.remove('hovered');
			});
		}
	});
};

stats_hover_items.forEach((item) => hoverMititocen(item));
circle_hover_items.forEach((item) => hoverMititocen(item));
///////////////// mititocen hove /////////////////
///
///
///
// =============== Звезды =============== //
const speed = 800;

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 *
 * @param {Element} star
 */
const moveStar = async (star) => {
	const vw = window.innerWidth;
	const vh = window.innerHeight;

	const corner = Math.atan(vh / vw) * (180 / 3.14);

	star.style.rotate = `-${Math.round(corner * (0.5 + Math.random()))}deg`;
	star.style.top = `-${Math.round(10 + Math.random() * 300)}px`;
	star.style.transition = `transform ${speed}ms ease-in, opacity ${speed}ms linear`;

	await sleep(speed);

	star.style.transform = `translateX(-${vw * 2}px)`;
	star.style.opacity = `0`;

	await sleep(speed);

	star.style.transition = '';
	star.style.transform = '';
	star.style.opacity = '';

	await sleep(1000 + Math.round(Math.random() * 3000));
	moveStar(star);
};

const stars = document.querySelectorAll('.star');
const startStarFall = async () => {
	for (let star of stars) {
		await sleep(2000);
		moveStar(star);
	}
};
startStarFall();

// =============== Звезды =============== //
///
///
///
// =============== Отмена скролла body =============== //
const mobileHeader = document.querySelector('.header');

mobileHeader.addEventListener('touchstart', (e) => {
	if (mobileHeader.classList.contains('opened')) {
		e.stopPropagation();
	}
});
// =============== Отмена скролла body =============== //
///
///
///
// =============== Soon Open =============== //
const openingButtons = document.querySelectorAll('[data-soon-open]');

openingButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		const data = btn.dataset.soonOpen;
		const soonBlock = document.querySelector(`[data-soon=${data}]`);

		soonBlock.classList.add('opened');
		bodyOverflow.disable();

		const onClose = (e) => {
			e.preventDefault();
			soonBlock.classList.remove('opened');
			bodyOverflow.enable();
		};
		soonBlock.addEventListener('click', onClose, { once: true });
		window.addEventListener('keydown', onClose, { once: true });
	});
});
// =============== Soon Open =============== //
