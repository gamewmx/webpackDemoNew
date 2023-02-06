import React, {useEffect} from 'react'
import AMapLoader from '@amap/amap-jsapi-loader';
import './style/mapContainer.less'
function mapContainer(props){
    let map
    let trafficTile
    let mapProto
    let BeijingMaker
    let distanceArray = []
    useEffect(()=>{
        const fn = async ()=>{
            let res = await AMapLoader.load({
                key:"45ba4fb4e19fae391c3119ec19de4228",                     // 申请好的Web端开发者Key，首次调用 load 时必填
                version:"2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins:['Amap.Scale'],               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
            return Promise.resolve(res)
        }
        fn().then((AMap)=>{
            mapProto = AMap
            console.log(mapProto)
            map = new AMap.Map("mapContainer",{ //设置地图容器id
                viewMode:"3D",         //是否为3D地图模式
                zoom:15,                //初始化地图级别
                // LngLat:[105.602725,37.076636],
                // center:[114,30], //初始化地图中心点位置
            });
            trafficTile = new AMap.TileLayer.Traffic({
                autoRefresh:true,
                interval:10
            })
            map.add(trafficTile)
            // 同时引入工具条插件，比例尺插件和鹰眼插件
            AMap.plugin([
                'AMap.ToolBar',
                'AMap.Scale',
                'AMap.HawkEye',
                'AMap.MapType',
                'AMap.Geolocation',
                'AMap.ControlBar'
            ], function(){
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar());

                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale());

                // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                map.addControl(new AMap.HawkEye({isOpen:true}));

                // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                map.addControl(new AMap.MapType());

                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                map.addControl(new AMap.Geolocation());
                map.addControl(new AMap.ControlBar());
            });
            map.on('click', aaaa);
            // BeijingMaker = new AMap.Marker({
            //     position:new AMap.LngLat(116.39, 39.9),
            //     title:'北京'
            // })
            // map.add(BeijingMaker)
        }).catch(e=>{
            console.log(e);
        })

    },[])

    trafficTile = ()=>{
        map.remove(trafficTile)
    }

    const aaaa = (e)=>{
        // var marker = new AMap.Marker({
        //     position: new AMap.LngLat(116.39, 39.9),  // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        //     title: '北京'
        // });
        // BeijingMaker = new mapProto.Maker({
        //
        // })
        // console.log(mapProto)
        // mapProto.clear
        // map.clearMap()
        let lng = e.lnglat.lng
        let lat = e.lnglat.lat
        var maker = new mapProto.Marker({
            // map,
            position: e.lnglat,
            title:'customMaker',
            draggable:true

        })
        if(distanceArray.length === 2){
            // distanceArray.shift()
            // console.log(map.getAllOverlays())
            // map.getAllOverlays.shift()
            distanceArray = []
            map.clearMap()
        }
        distanceArray.push([e.lnglat.lng,e.lnglat.lat])
        // var path = [new mapProto.LngLat(118.780245,32.039325),new mapProto.LngLat(118.790245,32.039325),new mapProto.LngLat(118.780245,32.049325),new mapProto.LngLat(118.790245,32.049325)]
        // var circle = new mapProto.Circle({
        //     center:e.lnglat,
        //     radius:1000,
        //     fillColor:'red',
        //     strokeColor:'#fff',
        //     strokeWeight:3
        // })
        // map.add(circle)
        // var polygon = new mapProto.Polygon({
        //     path,
        //     fillColor:'red',
        //     strokeColor:'blue',
        //     borderWeight:2
        // })
        // map.add(polygon)
        map.setFitView()
        var line = new mapProto.Polyline({
            strokeColor:'red',
            strokeWeight:2,
            isOutLine:true,
            outerLineColor:'white'
        })
        // let geolocation
        // map.plugin('AMap.Geolocation',()=>{
        //     geolocation = new mapProto.Geolocation({
        //         zoomToAccuracy:true,
        //         enableHighAccuracy:true,
        //         buttonPosition:'RB'
        //     })
        //     map.addControl(geolocation)
        //    geolocation.getCurrentPosition((record)=>{
        //         console.log(record)
        //     },(a)=>{
        //        console.log(a)
        //    })
        // })


        map.add(maker)
    }

    return (
        <>
            <div  id={'mapContainer'} className="map" style={{ height: '800px' }}>

            </div>
            <button onClick={aaaa}>test</button>
        </>
    )
}
export default mapContainer