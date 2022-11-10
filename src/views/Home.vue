<template>
	<section class="home">
		<h1>{{$t('home.title')}}</h1>
		<nav class="content">
			<div
				class="mtr home_nav"
				tabindex="0"
				data-nav="1"
				@click="goMtr"
				:class="{ zindex: animate }"
			>
				<img src="@/assets/img/MTR.png" alt="MTR" title="MTR" />
				<span>{{$t('home.nav')[0]}}</span>
				<div class="animate" :class="{ scaleDrew: animate, scaleDrewRtl: animateRtl }">
					<img src="@/assets/img/MTR.png" alt="MTR" title="MTR" />
					<span>{{$t('home.nav')[0]}}</span>
				</div>
			</div>
			<div
				class="zoom home_nav"
				data-nav="2"
				tabindex="0"
				@click="goZoom"
                :class="{disabled}"
			>
				<img v-show="!disabled" src="@/assets/img/ZOOM.png" alt="ZOOM" title="ZOOM" />
				<span>{{disabled? $t('disabled') : $t('home.nav')[1]}}</span>
				<div class="animate" :class="{ scaleDrewToZoom: fadeMove }">
					<img src="@/assets/img/ZOOM.png" alt="ZOOM" title="ZOOM" />
					<span>{{$t('home.nav')[1]}}</span>
				</div>
			</div>
		</nav>
	</section>
</template>

<script>
// @ is an alias to /src
import { handleTabEnter } from '@/utils/handle'
export default {
	data() {
		return {
			show: true,
			animate: false,
			backMate: false,
			fadeMove: false,
			disabled: false,
			locale: this.$i18n.locale,
			animateRtl: false
		}
	},
	name: 'Home',
	components: {},
	mounted() {
		localStorage.removeItem('path')
		localStorage.removeItem('index')
		handleTabEnter('.home_nav', (e) => {
			let idx = e.getAttribute('data-nav')
			if (idx == null) return
			if (idx == 1) this.goMtr()
			if (idx == 2) this.goZoom()
		})
		this.$EventBus.$off('handleNavClick')
		this.$EventBus.$on('handleNavClick', (item) => {
			if (item.path == '/zoom') {
				this.disabled = true
			}
		})
	},
	methods: {
		goMtr() {
			if(["Arabic", "Hebrew"].includes(this.$i18n.locale)) {
				this.animateRtl = true
			} else {
				this.animate = true
			}
			this.$EventBus.$emit('change', 1)
			setTimeout(() => {
				this.$router.push('/mtr')
			}, 750)
			localStorage.setItem('isHome', 1)
		},
		goZoom() {
			this.disabled = true
			if(this.disabled) return
			this.fadeMove = true
			this.$EventBus.$emit('change', 2)
			setTimeout(() => {
				this.$router.push('/zoom')
			}, 750)
			localStorage.setItem('isHome', 1)
		},
	},
}
</script>
<style lang="scss" scoped>
.home {
	background: url('~@/assets/img/Homebg.png') no-repeat center;
	background-size: cover;
	overflow: hidden;
	h1,
	h2 {
		color: #fff;
		text-align: center;
	}
	h1 {
		font-size: 0.3rem;
		margin: 0.8rem 0 0.08rem 0;
	}
	h2 {
		font-size: 0.26rem;
		font-weight: normal;
	}
	.content {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.mtr,
	.zoom {
		width: 2.4rem;
		height: 2.4rem;
		background-color: #2b4560;
		border-radius: 0.4rem;
		margin: 0 0.9rem;
		margin-top: 0.48rem;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.26rem;
		cursor: pointer;
		transition: all 0.5s ease-out;
		position: relative;
		&:hover {
			background-color: #6388a5;
		}
		img {
			width: 1.06rem;
			height: 1.06rem;
			object-fit: cover;
			margin-bottom: 0.24rem;
		}
		.animate {
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 0.26rem;
			position: absolute;
			width: 2.4rem;
			height: 2.4rem;
			background-color: #6388a5;
			border-radius: 0.4rem;
			z-index: -1;
			img {
				width: 1.06rem;
				height: 1.06rem;
				object-fit: cover;
				margin-bottom: 0.24rem;
			}
		}
		.scaleDrewRtl {
			right: 0;
			animation: scaleDrewRtl 0.75s ease-in-out;
			animation-fill-mode: forwards;
			border-radius: 0;
			z-index: 10;
		}
		.scaleDrew {
			left: 0;
			animation: scaleDrew 0.75s ease-in-out;
			animation-fill-mode: forwards;
			border-radius: 0;
			z-index: 10;
		}
		.scaleDrewToZoom {
			right: 0;
			animation: scaleDrewToZoom 0.75s ease-in-out;
			animation-fill-mode: forwards;
			border-radius: 0;
			z-index: 10;
		}
	}
	.disabled {
		background-color: #d6d7d9 !important;
		color: #58a2f1;
		transition: 0s;
		font-size: 0.26rem;
	}
	.zoomAnimate {
		background-color: #6388a5;
		position: absolute;
		left: 0;
		color: #fff;
		font-size: 0.26rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			width: 1.06rem;
			height: 1.06rem;
			object-fit: cover;
			margin-bottom: 0.24rem;
		}
	}
}

@keyframes scaleBack {
	0% {
		transform: scale(7);
	}
	100% {
		transform: scale(1);
	}
}

@media screen and (orientation: portrait) {
	.home,
	.zoomAnimate {
		width: 100vh;
		height: calc(100vw - 1rem);
	}
	.zoomAnimate {
		top: 100vw;
	}
	@keyframes scaleDrew {
		0% {
			width: 2.4rem;
			height: 2.4rem;
			left: 0;
		}
		100% {
			width: 100vh;
			height: calc(100vw - .2rem);
			left: calc(calc(6.6rem - 100vh) / 2);
		}
	}

	@keyframes scaleDrewRtl {
		0% {
			width: 2.4rem;
			height: 2.4rem;
			left: 0;
		}
		100% {
			width: 100vh;
			height: calc(100vw - .2rem);
			right: calc(calc(6.6rem - 100vh) / 2);
		}
	}

	@keyframes scaleDrewToZoom {
		0% {
			width: 2.4rem;
			height: 2.4rem;
			right: 0;
		}
		100% {
			width: 100vh;
			height: calc(100vw - 1rem);
			right: calc(calc(6.6rem - 100vh) / 2);
		}
	}
	@keyframes fadeMove {
		0% {
			top: 100vw;
		}
		100% {
			top: 1rem;
		}
	}
}

@media screen and (orientation: landscape) {
	.home,
	.zoomAnimate {
		width: 100vw;
		height: calc(100vh - 1rem);
	}
	.zoomAnimate {
		top: 100vh;
	}
	@keyframes scaleDrew {
		0% {
			width: 2.4rem;
			height: 2.4rem;
		}
		100% {
			width: 100vw;
			height: calc(100vh - .2rem);
			left: calc(calc(6.6rem - 100vw) / 2);
		}
	}

	@keyframes scaleDrewToZoom {
		0% {
			width: 2.4rem;
			height: 2.4rem;
		}
		100% {
			width: 100vw;
			height: calc(100vh - 1rem);
			right: calc(calc(6.6rem - 100vw) / 2);
			//   left: 0;
		}
	}
	@keyframes scaleDrewRtl {
		0% {
			width: 2.4rem;
			height: 2.4rem;
		}
		100% {
			width: 100vw;
			height: calc(100vh - .2rem);
			right: calc(calc(6.6rem - 100vw) / 2);
		}
	}

	@keyframes scaleDrewToZoomRtl {
		0% {
			width: 2.4rem;
			height: 2.4rem;
		}
		100% {
			width: 100vw;
			height: calc(100vh - 1rem);
			right: calc(calc(6.6rem - 100vw) / 2);
			//   left: 0;
		}
	}
}
</style>
