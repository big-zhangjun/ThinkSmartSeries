<template>
	<section class="Mtr" :class="mtrLg">
		<div class="animate" :class="{ scaleDrew: animate }">
			<img src="@/assets/img/MTR.png" alt="MTR" title="MTR" />
			<span>{{ $t('home.nav')[0] }}</span>
		</div>
		<div class="box" ref="screen" :max="0" :class="bgc">
			<div slot="item" class="item" style="padding: 0 0.8rem">
				<Tabs
					@handleTab="handleTab"
					:list="$t('mtr.tabs')"
					ref="tabs"
				/>
				<!-- 第一页 -->
				<section v-show="active == 0" class="page1" :class="{ rtl }">
					<ul class="left-atricle">
						<li
							v-for="(item, idx) in leftAtricle"
							:key="item.title"
							:class="item.class"
						>
							<h1>
								{{ $t('mtr.Overview.leftAtricle')[idx].title }}
							</h1>
							<p
								v-html="
									$t('mtr.Overview.leftAtricle')[idx].content
								"
							></p>
						</li>
					</ul>
					<div class="content">
						<img
							class="mtr-home"
							src="@/assets/img/mtr_home.png"
							alt="mtr_home"
						/>
						<ul>
							<li class="guide-line1 guide-line fadein1"></li>
							<li class="guide-line2 guide-line fadein2"></li>
							<li class="guide-line3 guide-line fadein3"></li>
							<li class="guide-line4 guide-line fadein1"></li>
							<li class="guide-line5 guide-line fadein2"></li>
							<li class="guide-line6 guide-line fadein3"></li>
							<li class="guide-line7 guide-line fadein4"></li>
						</ul>
					</div>
					<ul class="right-atricle" :class="{ rlSmall }">
						<li
							v-for="(item, idx) in rightAtricle"
							:key="item.title"
							:class="item.class"
						>
							<h1>
								{{ $t('mtr.Overview.rightAtricle')[idx].title }}
							</h1>
							<p
								v-html="
									$t('mtr.Overview.rightAtricle')[idx].content
								"
							></p>
						</li>
					</ul>
				</section>
				<!-- 第二页 -->
				<Swiper
					ref="swiper1"
					v-show="active == 1"
					:active="active"
					:max="2"
					:className="'page2'"
					:show="active == 1"
				>
					<div slot="item" class="slide-item">
						<img
							src="@/assets/img/Join a scheduled meeting_step 1.png"
							alt
						/>
						<article>
							<h1>
								{{ $t('mtr.JoinAScheduledMeeting')[0].title }}
							</h1>
							<p>
								{{
									$t('mtr.JoinAScheduledMeeting')[0].content1
								}}
							</p>
							<p>
								{{
									$t('mtr.JoinAScheduledMeeting')[0].content2
								}}
							</p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/Picjoin.png" alt />
						<article>
							<h1>
								{{ $t('mtr.JoinAScheduledMeeting')[1].title }}
							</h1>
							<p
								v-html="
									$t('mtr.JoinAScheduledMeeting')[1].content1
								"
							></p>
						</article>
					</div>
				</Swiper>
				<!-- 第三页 -->
				<Swiper
					ref="swiper2"
					:active="active"
					v-show="active == 2"
					:max="3"
					:className="'page2'"
					:show="active == 2"
				>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/mtr_home.png" alt />
						<article>
							<h1>{{ $t('mtr.CreateAMeeting')[0].title }}</h1>
							<p
								v-html="$t('mtr.CreateAMeeting')[0].content1"
							></p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/Picname.png" alt />
						<article>
							<h1>{{ $t('mtr.CreateAMeeting')[1].title }}</h1>
							<p
								v-html="$t('mtr.CreateAMeeting')[1].content1"
							></p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/Pictojoin.png" alt />
						<article>
							<h1>{{ $t('mtr.CreateAMeeting')[2].title }}</h1>
							<p
								v-html="$t('mtr.CreateAMeeting')[2].content1"
							></p>
						</article>
					</div>
				</Swiper>
				<!-- 第四页 -->
				<Swiper
					ref="swiper3"
					:active="active"
					v-show="active == 3"
					:max="3"
					:className="'page2'"
					show
				>
					<div slot="item" class="slide-item">
						<img
							v-if="isWX"
							class="share-video"
							src="@/assets/img/zoom.gif"
							alt=""
						/>
						<video
							v-else
							class="share-video"
							x-webkit-airplay="allow"
							webkit-playsinline="true"
							playsinline="true"
							x5-video-player-type="h5-page"
							preload="auto"
							autoplay="autoplay"
							muted
							loop
							height="100%"
						>
							<track kind="captions" />
							<source
								src="@/assets/video/zoom.mp4"
								type="video/mp4"
							/>
						</video>
						<article>
							<h1>{{ $t('mtr.ShareContent')[0].title }}</h1>
							<p v-html="$t('mtr.ShareContent')[0].content1"></p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img
							src="@/assets/img/Share with online attendees.png"
							alt
						/>
						<article>
							<h1>{{ $t('mtr.ShareContent')[1].title }}</h1>
							<p>
								{{ $t('mtr.ShareContent')[1].content1 }}
								<img
									class="share"
									src="@/assets/img/top.png"
									alt="share"
									title="share"
								/>
								{{ $t('mtr.ShareContent')[1].content2 }}
							</p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img
							src="@/assets/img/Stop sharing content with screen.png"
							alt
						/>
						<article>
							<h1>{{ $t('mtr.ShareContent')[2].title }}</h1>
							<p>
								{{ $t('mtr.ShareContent')[2].content1 }}
								<img
									src="@/assets/img/close.png"
									alt="close"
									class="close"
									title="close"
								/>
								{{ $t('mtr.ShareContent')[2].content2 }}
							</p>
						</article>
					</div>
				</Swiper>
			</div>
		</div>
		<Footer></Footer>
	</section>
</template>

<script>
import { handleTabEnter } from '@/utils/handle'
import Tabs from '../components/Tabs'
import Swiper from '../components/Swiper/index.vue'
import Footer from '../components/Footer/index.vue'

export default {
	name: 'swiper-example-pagination-fraction',
	title: 'Fraction pagination',
	components: {
		// Screen,
		Tabs,
		Footer,
		Swiper,
	},
	data() {
		return {
			active: 0,
			activeBtn: 0,
			animate: false,
			bg: [
				require('@/assets/img/MTR_1.png'),
				require('@/assets/img/MTRbg.png'),
				require('@/assets/img/MTR_1.png'),
				require('@/assets/img/MTR&Zoom.png'),
			],
			leftAtricle: [
				{
					title: 'Room calendar',
					content: 'Show scheduled meetings.',
					class: 'fadein1',
				},
				{
					title: 'Meet',
					content: 'Start a new meeting.',
					class: 'fadein2',
				},
				{
					title: 'Share',
					content: 'Start or stop content sharing.',
					class: 'fadein3',
				},
			],
			rightAtricle: [
				{
					title: 'Conference room name',
					content:
						'Used to search for the conference<br />room email.',
					class: 'fadein1',
				},
				{
					title: 'Call',
					content: 'Make a phone call.',
					class: 'fadein2',
				},
				{
					title: 'More',
					content: 'View more information and settings.',
					class: 'fadein3',
				},
				{
					title: 'Voice recognition',
					content: 'Enable or disable voice recognition.',
					class: 'fadein3',
				},
			],
			isWX: false,
		}
	},
	//   watch: {
	//     locale: {
	//       handler(val) {
	// 		if(["Arabic"].includes(val)) {
	// 			this.rtl = true
	// 		} else {
	// 			this.rtl = false
	// 		}
	//       },
	//     },
	//   },
	computed: {
		bgc() {
			return 'bg' + this.active
		},
		rtl() {
			return ['Arabic', 'Hebrew'].includes(this.$i18n.locale)
		},
		mtrLg() {
			return this.$i18n.locale
		},
		rlSmall() {
			return [
				'Bulgarian',
				'Czech',
				'German',
				'Spanish',
				'Greek',
				'French',
				'Croatian',
				'HU',
				'Italian',
				'Polish',
				'Dutch',
				'PT',
				'PTBR',
				'Romanian',
				'Slovak',
				'Slovenian',
				'SRLATN',
				'Indonesian',
			].includes(this.$i18n.locale)
		},
	},
	mounted() {
		if (localStorage.getItem('path') != '/home') {
			this.animate = true
		}
		this.isWeixin()
		this.$nextTick(() => {
			handleTabEnter('.tabs', (e) => {
				let type = e.getAttribute('data-btn')
				if (type != null) {
					console.log(this.$refs.swiper)
					if (this.active == 1) {
						if (type == 'handleLeft')
							this.$refs.swiper1.handleLeft()
						if (type == 'handleRight')
							this.$refs.swiper1.handleRight()
					} else {
						if (type == 'handleLeft')
							this.$refs.swiper2.handleLeft()
						if (type == 'handleRight')
							this.$refs.swiper2.handleRight()
					}
				}
				let idx = e.getAttribute('data-tab')
				if (idx == null) return
				this.$refs.tabs.handleClick(null, idx)
			})
		})
	},
	methods: {
		isWeixin() {
			let user = navigator.userAgent.toLowerCase()
			if (user.match(/MicroMessenger/i) == 'micromessenger') {
				this.isWX = true
			} else {
				this.isWX = false
			}
		},
		handleTab(v) {
			this.active = v
		},
		// nextPage() {
		//   this.$refs.screen.nextPage();
		// },
	},
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 50%;
	bottom: 0.3rem;
	transform: translateX(-50%);
	.down {
		width: 0.21rem;
		height: 0.15rem;
		display: block;
	}
}
.Mtr {
	.page1 {
		display: flex;
		justify-content: space-evenly;
		transform: scale(1.05);
		transform-origin: 7rem 3rem;
		pointer-events: none;
		.left-atricle,
		.right-atricle {
			margin-top: 0.8rem;
			margin-right: 0.1rem;
			h1 {
				font-size: 0.22rem;
				color: #1c1c1e;
				margin: 0.02rem;
				margin-bottom: 0.05rem;
			}
			p {
				font-size: 0.2rem;
				color: #1c1c1e;
				line-height: 1.2;
				margin-bottom: 0.34rem;
				font-weight: normal;
			}
			li {
				opacity: 0;
			}
		}
		.left-atricle {
			max-width: 5rem;
		}

		.right-atricle {
			max-width: 4rem;
			margin-top: 0.47rem;
			margin-left: 0.32rem;
			p {
				margin-bottom: 0.24rem;
			}
		}
		.rlSmall {
			max-width: 4rem;
			p {
				margin-bottom: 0.18rem;
			}
		}
		.content {
			width: 5.8rem;
			height: 3rem;
			position: relative;
			margin-top: 0.6rem;
			.mtr-home {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
			.guide-line {
				position: absolute;
				opacity: 0;
				border-right: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line1 {
				width: 2.2rem;
				height: 0.14rem;
				top: 0.35rem;
				left: -0.36rem;
				border-top: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line2 {
				width: 3.1rem;
				top: 1.24rem;
				left: -0.36rem;
				border-top: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line3 {
				width: 3.3rem;
				height: 0.22rem;
				bottom: 0.77rem;
				left: -0.36rem;
				border-bottom: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line4 {
				width: 1.6rem;
				height: 0.32rem;
				top: 0.2rem;
				right: -0.2rem;
				border-right: none;
				border-top: 0.02rem solid rgb(158, 158, 158);
				border-left: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line5 {
				width: 1.13rem;
				top: 1.3rem;
				right: -0.2rem;
				border-bottom: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line6 {
				width: 1.13rem;
				top: 1.85rem;
				right: -0.2rem;
				border-bottom: 0.02rem solid rgb(158, 158, 158);
			}
			.guide-line7 {
				width: 1.63rem;
				top: 2.6rem;
				right: -0.2rem;
				border-bottom: 0.02rem solid rgb(158, 158, 158);
			}
		}
	}
	.rtl {
		transform: scale(1);
		.right-atricle {
			max-width: 3.6rem;
			h1 {
				margin-bottom: 0;
			}
			p {
				margin-bottom: 0.2rem;
			}
		}
		.content {
			.guide-line {
				position: absolute;
				opacity: 0;
			}
			.guide-line1 {
				width: 3.6rem;
				top: 0.75rem;
				height: 0;
				left: 2.4rem;
			}
			.guide-line2 {
				width: 2.4rem;
				top: 1.24rem;
				left: 3.6rem;
			}
			.guide-line3 {
				width: 2.6rem;
				bottom: 0.77rem;
				left: 3.4rem;
				border-left: 0.02rem solid rgb(158, 158, 158);
				border-right: none;
			}
			.guide-line4 {
				width: 4.2rem;
				border-left: none;
				border-right: 0.02rem solid rgb(158, 158, 158);
				height: 0.32rem;
				top: 0.2rem;
				right: 1.6rem;
			}
			.guide-line5 {
				width: 4.2rem;
				top: 1.4rem;
				right: 1.6rem;
			}
			.guide-line6 {
				width: 4.2rem;
				top: 2.05rem;
				right: 1.6rem;
			}
			.guide-line7 {
				width: 4.2rem;
				top: 2.6rem;
				right: 1.6rem;
			}
		}
	}
	p {
		line-height: 1.2;
	}
	.page2 {
		width: 11rem;
		position: relative;
		.slide-item {
			width: 10rem;
			display: flex;
			margin-top: 0.48rem;
			align-items: center;
			justify-content: space-between;
			article {
				// margin-left: 0.26rem;
				width: 3.8rem;
				font-size: 0.22rem;
				h1 {
					margin-bottom: 0.16rem;
					font-size: 0.24rem;
				}
				p {
					margin-bottom: 0.2rem;
				}
				.share,
				.close {
					width: 0.3rem;
					object-fit: scale-down;
					height: 0.3rem;
					margin-bottom: -0.065rem;
				}
				.close {
				}
			}
			img {
				width: 5.85rem;
				height: 3.63rem;
				object-fit: contain;
				position: relative;
			}
			.share-video {
				width: 5.78rem;
				height: 3.63rem;
				object-fit: cover;
				border-radius: 0.05rem;
			}
		}
	}
	.page4 {
		text-align: right;
		width: 10rem;
		position: relative;
		box-sizing: border-box;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		.left_img {
			width: 5.85rem;
			height: 3.63rem;
			margin-right: 0.4rem;
			margin-top: 0.48rem;
			object-fit: contain;
		}
		h1 {
			margin-top: 1.4rem;
			font-size: 0.3rem;
			color: #1c1c1e;
			margin-bottom: 0.1rem;
		}
		button {
			width: 1.6rem;
			height: 0.88rem;
			border-radius: 0.2rem;
			background-color: #263f52;
			box-shadow: 0.02rem 0.02rem 0.04rem 0.01rem rgba(9, 30, 53, 0.3);
			border-color: transparent;

			border: 0;
			outline: none;
			img {
				width: 0.35rem;
				height: 0.35rem;
				object-fit: scale-down;
			}
			p {
				margin: 0;
				color: #fff;
				text-align: center;
				font-size: 0.14rem;
			}
		}
		.btn1 {
			margin-right: 0.16rem;
		}
		.activeBtn {
			background-color: #6388a5;
			box-shadow: 0.02rem 0.02rem 0.04rem 0.01rem rgba(22, 49, 45, 0.5)
				inset;
		}
	}
	.animate {
		color: #fff;
		display: flex;
		pointer-events: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.26rem;
		position: absolute;
		background-color: #6388a5;
		z-index: 100;
		animation: fadeOut 0.5s ease-in-out;
		animation-delay: 0;
		animation-fill-mode: forwards;
		img {
			width: 1.06rem;
			height: 1.06rem;
			object-fit: cover;
			display: block;
			margin-bottom: 0.24rem;
		}
	}
}

.bg0 {
	background: url('~@/assets/img/MTR_1.png') no-repeat center bottom;
	background-size: cover;
}
.bg1 {
	background: url('~@/assets/img/MTRbg.png') no-repeat center bottom;
	background-size: cover;
}
.bg2 {
	background: url('~@/assets/img/MTR_1.png') no-repeat center bottom;
	background-size: cover;
}
.bg3 {
	background: url('~@/assets/img/MTR&Zoom.png') no-repeat center bottom;
	background-size: cover;
}

.fadein1 {
	animation: fadeIn 0.75s ease-in-out;
	animation-delay: 0;
	animation-fill-mode: forwards;
}
.fadein2 {
	animation: fadeIn 0.75s ease-in-out;
	animation-delay: 0.75s;
	animation-fill-mode: forwards;
}

.fadein3 {
	animation: fadeIn 0.75s ease-in-out;
	animation-delay: 1.5s;
	animation-fill-mode: forwards;
}
.fadein4 {
	animation: fadeIn 0.75s ease-in-out;
	animation-delay: 2s;
	animation-fill-mode: forwards;
}
.zoomIn {
	animation: zoomIn 0.1s ease-in-out;
}
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@keyframes zoomIn {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(1.05);
	}
}
@media screen and (orientation: portrait) {
	.Mtr,
	.animate,
	.box {
		width: 100vh;
		height: calc(100vw - 1rem);
		overflow: hidden;
	}
}

@media screen and (orientation: landscape) {
	.Mtr,
	.animate,
	.box {
		width: 100vw;
		height: calc(100vh - 1rem);
		overflow: hidden;
	}
}
</style>
