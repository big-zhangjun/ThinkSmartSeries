export const handleTabEnter = (el, callBack) => {
	document.onkeydown = function (e) {
		if (e.key === 'Enter') {
            callBack && callBack(document.activeElement)
		}
	}
}
