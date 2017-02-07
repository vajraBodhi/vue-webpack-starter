// var MigrationOverlay = require('./routes/migration');
import MigrationOverlay from './routes/migration';

window.a = 10;
window.map=null,
window.mOverlay=null,
window.onload = function(){
  var data = '[{"from":[113.26627,23.13171],"to":[108.32754,22.81521],"labels":[null,"广西"],"color":"#ff3a31"},{"from":[113.26627,23.13171],"to":[112.9834,28.11266],"labels":[null,"湖南"],"color":"#ff7e2b"},{"from":[113.26627,23.13171],"to":[115.91004,28.67417],"labels":[null,"江西"],"color":"#ffc726"},{"from":[113.26627,23.13171],"to":[114.34234,30.54539],"labels":[null,"湖北"],"color":"#e9ff20"},{"from":[113.26627,23.13171],"to":[119.29659,26.09982],"labels":[null,"福建"],"color":"#99ff1b"},{"from":[113.26627,23.13171],"to":[106.70722,26.5982],"labels":[null,"贵州"],"color":"#45ff15"},{"from":[113.26627,23.13171],"to":[104.07572,30.65089],"labels":[null,"四川"],"color":"#10ff33"},{"from":[113.26627,23.13171],"to":[120.1536,30.26555],"labels":[null,"浙江"],"color":"#0aff84"},{"from":[113.26627,23.13171],"to":[121.4737,31.23037],"labels":[null,"上海"],"color":"#05ffd9"},{"from":[113.26627,23.13171],"to":[113.75322,34.76571],"labels":[null,"河南"],"color":"#00ccff"}]';
    window.map=new qq.maps.Map(document.getElementById("map_container"),{
      zoom:4,
      center:new qq.maps.LatLng(37.43496995956318,106.92269849999998),
      mapTypeId:qq.maps.MapTypeId.ROADMAP
    });
    window.mOverlay=new QQMapPlugin.MigrationOverlay(window.map,{data:JSON.parse(data)});
    new qq.maps.Label({
      position:new qq.maps.LatLng(25.735,123.46777777777777),
      map:window.map,content:"钓鱼岛",
      style:{borderStyle:"none",color:"#fff",backgroundColor:"transparent"}}),
    new qq.maps.Label({
      position:new qq.maps.LatLng(25.9175,124.55138888888888),
      map:window.map,
      content:"赤尾屿",
      offset:new qq.maps.Size(0,(-10)),
      style:{borderStyle:"none",color:"#fff",backgroundColor:"transparent"}
    });
}