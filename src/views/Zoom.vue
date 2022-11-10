<template>
	<section class="zoom">
		<div class="animate">
			<img src="@/assets/img/ZOOM.png" alt="zoom" title="zoom" />
			<span>Zoom Rooms</span>
		</div>
		<Tabs @handleTab="handleTab" :list="tabList" ref="tabs" />
			<div slot="item" class="item" v-show="!active">
				<h1 class="title">You could find the latest information from Zoom Help Center.</h1>
				<ul>
					<li v-for="(item, idx) in list" :key="idx">
						<h1>{{ item.content }}</h1>
						<a role="link" :href="item.url"
							>{{ item.title }}
							<img
								src="@/assets/img/HelpLink_icon_Zoom@2x.png"
								class="right-arrow"
								alt="arrow"
								title="arrow"
						/></a>
					</li>
				</ul>
				<p class="page-fotter">
					<span>Note:</span>
					The above support articles are provided by Zoom.us.<br />Users
					in some countries or regions may need to wait patiently or
					try several times to open the web pages.
				</p>
			</div>
			<div slot="item" class="item page2" v-show="active">
				<Swiper :max="3" show :className="'page2'">
					<div slot="item" class="slide-item">
						<video
							class="share-video"
							x-webkit-airplay="allow"
							webkit-playsinline="true"
							playsinline="true"
							x5-video-player-type="h5-page"
							preload="auto"
							autoplay="autoplay"
							muted
							loop
							poster="@/assets/img/zoom.gif"
							height="100%"
						>
							<track kind="captions" />
							<source
								src="@/assets/video/zoom.mp4"
								type="video/mp4"
							/>
						</video>
						<article>
							<h1>Step 1</h1>
							<p>
								Connect your computer to the HDMI-in connector
								on ThinkSmart One. Your screen will be shared
								with onsite attendees automatically.
							</p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/zoom1.png" alt />
						<article>
							<h1>Step 2</h1>
							<p>
								Join the meeting on ThinkSmart Controller, and
								click
								<img
									class="share"
									src="@/assets/img/icon-1.png"
									alt="share"
									title="share"
								/>
								to start sharing with both onsite and online
								attendees.
							</p>
						</article>
					</div>
					<div slot="item" class="slide-item">
						<img src="@/assets/img/zoom2.png" alt />
						<article>
							<h1>Step 3</h1>
							<p>
								Click
								<img
									src="@/assets/img/icon-1.png"
									alt="close"
									class="close"
									title="close"
								/>
								and disconnect from HDMI-in connector to stop
								sharing.
							</p>
						</article>
					</div>
				</Swiper>
			</div>
		<Footer />
	</section>
</template>

<script>
import Footer from '../components/Footer/index.vue'
import Swiper from '@/components/Swiper'
import Tabs from '../components/Tabs'
export default {
	data() {
		return {
			active: 0,
			animate: false,
			btnList: [
				{
					title: 'Connecting',
					src: require('@/assets/img/Connecting_icon_MTRandZoom@2x.png'),
				},
				{
					title: 'Sharing',
					src: require('@/assets/img/Sharing_icon_MTRandZoom@2x.png'),
				},
			],
			flag: true,
			list: [
				{
					content: 'Zoom Help Center',
					title: 'Go to Zoom Help Center',
					url: 'https:// support.zoom.us/hc/en-us/categories/200108436',
				},
				{
					content: 'Zoom Rooms User Guide',
					title: 'Go to Zoom Rooms User Guide',
					url: 'https://support.zoom.us/hc/en-us/articles/204772869-Zoom-Rooms-User-Guide',
				},
				{
					content: 'Controls and Settings',
					title: 'Go to Meeting Controls and Settings',
					url: 'https://support.zoom.us/hc/en-us/articles/360021921032-Zoom- Room-meeting-controls-and-settings',
				},
				{
					content: 'Scheduling Meetings',
					title: 'Go to Scheduling Meetings',
					url: 'https://support.zoom.us/hc/en-us/articles/201362413',
				},
				{
					content: 'Zoom Screen Sharing',
					title: 'Go to Screen Sharing',
					url: 'https://support.zoom.us/hc/en-us/articles/201362153-Sharing-your-screen',
				},
				{
					content: 'Zoom Direct Sharing',
					title: 'Go to Direct Sharing',
					url: 'https://support.zoom.us/hc/en-us/articles/214629303-Direct-sharing-in-Zoom-Rooms',
				},
			],
			tabList: [
				'Zoom Rooms information',
				'Share content',
			],
		}
	},
	components: {
		Swiper,
		Tabs,
		Footer,
	},
	mounted() {
		//判断手机横竖屏状态：
		this.orientationchange()
		window.addEventListener(
			'onorientationchange' in window ? 'orientationchange' : 'resize',
			this.orientationchange,
			false
		)
	},
	methods: {
		handleTab(v) {
			this.active = v
		},
		orientationchange() {
			if (window.orientation === 180 || window.orientation === 0) {
				this.flag = true
			}

			if (window.orientation === 90 || window.orientation === -90) {
				this.flag = false
			}
		}
		
	},
}
</script>

<style lang="scss" scoped>
.title {
	text-align: center;
	padding-top: 0.32rem;
	font-size: 0.22rem;
	color: #1c1c1e;
	font-weight: 600;
	margin-bottom: .2rem;
}
.container {
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 50%;
	cursor: pointer;
	bottom: 0.4rem;
	transform: translateX(-50%);
	.down {
		width: 0.21rem;
		height: 0.15rem;
		display: block;
	}
}
.zoom {
	background: url('~@/assets/img/MTR_1.png') no-repeat center;
	background-size: cover;
	overflow: hidden;
	.animate {
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		pointer-events: none;
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
	p {
		font-size: 0.22rem;
		text-align: center;
		color: #1c1c1e;
		margin-top: 0.1rem;
		margin-bottom: 0.33rem;
		line-height: 0.3rem;
		span {
			font-weight: bold;
		}
	}
	ul {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 11rem;
		margin: 0 auto;
		li {
			width: 4.5rem;
			margin-bottom: 0.45rem;
			&:nth-child(odd) {
				margin-right: 0;
				margin-left: .5rem;
			}
			&:nth-child(3) {
				width: 5rem;
				margin-right: 0;
			}
			h1 {
				font-size: 0.3rem;
				color: #1c1c1e;
				margin-bottom: 0.07rem;
			}
			a {
				color: #228eff;
				font-size: 0.22rem;
				line-height: 0.28rem;
				display: flex;
				align-items: center;
			}
			.right-arrow {
				width: 0.28rem;
				height: 0.28rem;
			}
		}
	}
	.page2 {
		background-size: cover;
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 11rem;
		.slide-item {
			width: 10rem;
			display: flex;
			margin-top: 0.48rem;
			align-items: center;
			article {
				margin-left: 0.26rem;
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
			}
			.share-video {
				width: 5.78rem;
				height: 3.63rem;
				object-fit: cover;
				border-radius: 0.05rem;
			}
		}
		.left_img {
			width: 6.13rem;
			height: 3.48rem;
			object-fit: contain;
			margin-right: 0.3rem;
			margin-bottom: 0.4rem;
		}
		h1 {
			font-size: 0.3rem;
			color: #1c1c1e;
		}
		p {
			color: #1c1c1e;
			font-size: 0.24rem;
			margin: 0.08rem 0 0.16rem 0;
			text-align: left;
			margin-bottom: 0;
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
			&:last-child {
				margin-right: 0;
			}
		}
		.active {
			box-shadow: 0.02rem 0.02rem 0.04rem 0.01rem rgba(22, 49, 45, 0.5)
				inset;
			background-color: #6388a5;
			animation: zoomIn 0.1s ease-in-out;
		}
	}
    .flag {
        .page2 {
            margin-top: 0;
        }
    }
	.page-fotter {
		font-size: 0.2rem;
		margin-top: 0;
		span {
			font-weight: 600;
			color: #1c1c1e;
		}
		color: #88949d;
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
	.zoom,
	.animate {
		width: 100vh;
		height: calc(100vw - 1rem);
		// li {
		// 	width: 35vh;
		// }
	}
}

@media screen and (orientation: landscape) {
	.zoom,
	.animate {
		width: 100vw;
		height: calc(100vh - 1rem);
		// li {
		// 	width: 35vw;
		// }
	}
}
</style>
