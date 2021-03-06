import styled from 'styled-components'
const StyledNoData = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 300px;
	height: calc(100vh - 245px);
	justify-content: center;
	align-items: center;
	.Nodatabox {
		font-size: 14px !important;
		color: #999;
		font-weight: 300;
	}
	.ant-empty-image {
		height: 40px;
		margin-bottom: 8px;
	}
	.ant-empty-image svg {
		height: 100%;
		margin: auto;
	}
	svg:not(:root) {
		overflow: hidden;
	}
	.ant-empty-img-simple-path {
		fill: #fafafa;
	}
	.ant-empty-img-simple-g {
		stroke: #d9d9d9;
	}
	.ant-empty-img-simple-ellipse {
		fill: #f5f5f5;
	}
`

export default function Nodata({ loading }) {
	if(loading){
		return null
	}
	return (
		<StyledNoData>
			<div class='ant-empty-image'>
				<svg class='ant-empty-img-simple' width='64' height='41' viewBox='0 0 64 41' xmlns='http://www.w3.org/2000/svg'>
					<g transform='translate(0 1)' fill='none' fill-rule='evenodd'>
						<ellipse class='ant-empty-img-simple-ellipse' cx='32' cy='33' rx='32' ry='7'></ellipse>
						<g class='ant-empty-img-simple-g' fill-rule='nonzero'>
							<path d='M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z'></path>
							<path
								d='M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z'
								class='ant-empty-img-simple-path'></path>
						</g>
					</g>
				</svg>
			</div>
			<div className={'Nodatabox'}>Nothing here</div>
		</StyledNoData>
	)
}
