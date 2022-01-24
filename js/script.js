const $ = jQuery;

$(() => {
	if (urlParam('et_fb')) return;

	const hh = $('header').outerHeight();
	$('#et-main-area').css({
		'min-height': `calc(100vh - ${hh}px)`,
		display: 'grid',
		'grid-template-rows': '1fr auto'
	});
	const setHeight = el => {
		el.css('height', '100%');
		const p = el.parent();
		if (p.attr('id') == 'main-content') return;
		setHeight(p);
	}
	setHeight($('#main-content .et_builder_inner_content'));

	const bar = $('#wpadminbar');
	if (bar.length) {
		bar.slideUp('slow');
		$.get('https://fa.kgl.app', {
			t: 'brands',
			i: 'wordpress'
		}, svg => {
			$(`<div class="admin-bar-show">${svg}</div>`)
				.on('click', () => bar.slideToggle('slow'))
				.appendTo('body');
		});

		$('body').append(`<style>
			html{
				margin-top: 0 !important;
			}
			.admin-bar-show {
				transition: 200ms all cubic-bezier(0.4, 0, 0.2, 1);
				position: fixed;
				bottom: 3px;
				left: 3px;
				fill: #101010;
				width: 32px;
				line-height: 32px;
				z-index: 99998;
				text-align: center;
				font-size: 23px;
				cursor: pointer;
			}
		</style>`);
	}

	const cm = $('[data-center-me]');
	if (cm.length) {
		cm.each(function() {
			$(this).css({
				left: '50%',
				top: '50%',
				tramsform: 'translate(-50%, -50%)'
			});

			const stop = $(this).data('center-stop');
			if (!stop) return;

			const setMyHeight = el => {
				el.css({
					height: '100%'
				});
				const p = el.parent();
				if (p.hasClass(stop)) return;
				setMyHeight(p);
			}
			setMyHeight($(this).parent());
		});
	}

	// Social icon fix
	$('.et-social-itunes')
		.removeClass('et-social-itunes')
		.addClass('et-social-discord')
	$('.et-social-discord > a').attr('title', 'Join us on Discord');
});

const urlParam = name => {
	const a = {};
	let r = window.location.href.match(/\?([^#]*)/);

	if (r == null)
		return null;

	r = r[1].split('&');

	r.forEach((v, k) => {
		v = v.split('=');
		a[v[0]] = decodeURI(v[1]);
	});

	return a[name] || a;
}