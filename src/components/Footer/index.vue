<template>
	<footer>
		<ul>
			<li
				v-for="(item, idx) in list"
				:key="item.title"
				@click="handleClick(item)"
			>
				{{ $t('footer')[idx] }}
				<img
					src="@/assets/img/arrow_down.png"
					alt="arrow"
					title="arrow"
				/>
			</li>
		</ul>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					title: 'Deployment Guide (MTR)',
					path: '/mtr',
					idx: 1,
				},
				{
					title: 'Deployment Guide (Zoom)',
					path: '/zoom',
					idx: 2,
				},
				{
					title: 'Hardware Maintenance Manual',
					path: '/faqs',
					idx: 3,
				},
			],
			locale: this.$i18n.locale,
		}
	},
	methods: {
		handleClick(item) {
			// this.$router.push(item.path)
			this.$EventBus.$emit('handleRouteClick', item, item.idx)
		},
	},
}
</script>

<style lang="scss" scoped>
footer {
	background-color: #333f48;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	ul {
		display: flex;
		align-items: center;
		font-size: 0.2rem;
		color: #fff;
		li {
			display: flex;
			align-items: center;
			margin: 0 0.27rem;
			cursor: pointer;
		}
		img {
			width: 0.28rem;
			object-fit: scale-down;
			transform: rotate(-90deg);
			margin-left: 0.16rem;
		}
	}
}
@media screen and (orientation: landscape) {
	footer {
		width: 100vw;
		height: 0.66rem;
	}
}
@media screen and (orientation: portrait) {
	footer {
		width: 100vh;
		height: 0.66rem;
	}
}
</style>
