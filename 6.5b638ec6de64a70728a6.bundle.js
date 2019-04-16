(window.webpackJsonp=window.webpackJsonp||[]).push([[6,8],{559:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return reactify});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);function _extends(){return(_extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c])Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a}).apply(this,arguments)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function reactify(a,b){var c=function(c){function d(a){var b;return _defineProperty(_assertThisInitialized(b=c.call(this,a)||this),"container",void 0),b.setContainerRef=b.setContainerRef.bind(_assertThisInitialized(b)),b}!function _inheritsLoose(a,b){a.prototype=Object.create(b.prototype),a.prototype.constructor=a,a.__proto__=b}(d,c);var e=d.prototype;return e.componentDidMount=function a(){this.execute()},e.componentDidUpdate=function a(){this.execute()},e.componentWillUnmount=function a(){this.container=void 0,b&&b.componentWillUnmount&&b.componentWillUnmount()},e.setContainerRef=function b(a){this.container=a},e.execute=function b(){this.container&&a(this.container,this.props)},e.render=function d(){var a=this.props,b=a.id,c=a.className;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{id:b,className:c,ref:this.setContainerRef})},d}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);_defineProperty(c,"propTypes",{id:prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,className:prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string});var d=c;return a.displayName&&(d.displayName=a.displayName),a.propTypes&&(d.propTypes=_extends({},d.propTypes,a.propTypes)),a.defaultProps&&(d.defaultProps=a.defaultProps),c}},565:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var reactify=__webpack_require__(559),d3=__webpack_require__(558),d3_default=__webpack_require__.n(d3),prop_types=__webpack_require__(0),prop_types_default=__webpack_require__.n(prop_types),src=__webpack_require__(4),d3_collection_src=__webpack_require__(151),d3_interpolate_src=__webpack_require__(109),src_sankey=function(){var sankey={},nodeWidth=24,nodePadding=8,size=[1,1],nodes=[],links=[];function computeLinkDepths(){function ascendingSourceDepth(a,b){return a.source.y-b.source.y}function ascendingTargetDepth(a,b){return a.target.y-b.target.y}nodes.forEach(function(node){node.sourceLinks.sort(ascendingTargetDepth),node.targetLinks.sort(ascendingSourceDepth)}),nodes.forEach(function(node){var sy=0,ty=0;node.sourceLinks.forEach(function(link){link.sy=sy,sy+=link.dy}),node.targetLinks.forEach(function(link){link.ty=ty,ty+=link.dy})})}function center(node){return node.y+node.dy/2}function value(link){return link.value}return sankey.nodeWidth=function(_){return arguments.length?(nodeWidth=+_,sankey):nodeWidth},sankey.nodePadding=function(_){return arguments.length?(nodePadding=+_,sankey):nodePadding},sankey.nodes=function(_){return arguments.length?(nodes=_,sankey):nodes},sankey.links=function(_){return arguments.length?(links=_,sankey):links},sankey.size=function(_){return arguments.length?(size=_,sankey):size},sankey.layout=function(iterations){return function computeNodeLinks(){nodes.forEach(function(node){node.sourceLinks=[],node.targetLinks=[]}),links.forEach(function(link){var source=link.source,target=link.target;"number"==typeof source&&(source=link.source=nodes[link.source]),"number"==typeof target&&(target=link.target=nodes[link.target]),source.sourceLinks.push(link),target.targetLinks.push(link)})}(),function computeNodeValues(){nodes.forEach(function(node){node.value=Math.max(Object(src.i)(node.sourceLinks,value),Object(src.i)(node.targetLinks,value))})}(),function computeNodeBreadths(){var nextNodes,remainingNodes=nodes,x=0;for(;remainingNodes.length;)nextNodes=[],remainingNodes.forEach(function(node){node.x=x,node.dx=nodeWidth,node.sourceLinks.forEach(function(link){nextNodes.indexOf(link.target)<0&&nextNodes.push(link.target)})}),remainingNodes=nextNodes,++x;(function moveSinksRight(x){nodes.forEach(function(node){node.sourceLinks.length||(node.x=x-1)})})(x),function scaleNodeBreadths(kx){nodes.forEach(function(node){node.x*=kx})}((size[0]-nodeWidth)/(x-1))}(),function computeNodeDepths(iterations){var nodesByBreadth=Object(d3_collection_src.b)().key(function(d){return d.x}).sortKeys(src.a).entries(nodes).map(function(d){return d.values});(function initializeNodeDepth(){var ky=Object(src.f)(nodesByBreadth,function(nodes){return(size[1]-(nodes.length-1)*nodePadding)/Object(src.i)(nodes,value)});nodesByBreadth.forEach(function(nodes){nodes.forEach(function(node,i){node.y=i,node.dy=node.value*ky})}),links.forEach(function(link){link.dy=link.value*ky})})(),resolveCollisions();for(var alpha=1;iterations>0;--iterations)relaxRightToLeft(alpha*=.99),resolveCollisions(),relaxLeftToRight(alpha),resolveCollisions();function relaxLeftToRight(alpha){function weightedSource(link){return center(link.source)*link.value}nodesByBreadth.forEach(function(nodes){nodes.forEach(function(node){if(node.targetLinks.length){var y=Object(src.i)(node.targetLinks,weightedSource)/Object(src.i)(node.targetLinks,value);node.y+=(y-center(node))*alpha}})})}function relaxRightToLeft(alpha){function weightedTarget(link){return center(link.target)*link.value}nodesByBreadth.slice().reverse().forEach(function(nodes){nodes.forEach(function(node){if(node.sourceLinks.length){var y=Object(src.i)(node.sourceLinks,weightedTarget)/Object(src.i)(node.sourceLinks,value);node.y+=(y-center(node))*alpha}})})}function resolveCollisions(){nodesByBreadth.forEach(function(nodes){var node,dy,i,y0=0,n=nodes.length;for(nodes.sort(ascendingDepth),i=0;i<n;++i)node=nodes[i],(dy=y0-node.y)>0&&(node.y+=dy),y0=node.y+node.dy+nodePadding;if((dy=y0-nodePadding-size[1])>0)for(y0=node.y-=dy,i=n-2;i>=0;--i)node=nodes[i],(dy=node.y+node.dy+nodePadding-y0)>0&&(node.y-=dy),y0=node.y})}function ascendingDepth(a,b){return a.y-b.y}}(iterations),computeLinkDepths(),sankey},sankey.relayout=function(){return computeLinkDepths(),sankey},sankey.link=function(){var curvature=.5;function link(d){var x0=d.source.x+d.source.dx,x1=d.target.x,xi=Object(d3_interpolate_src.b)(x0,x1),x2=xi(curvature),x3=xi(1-curvature),y0=d.source.y+d.sy+d.dy/2,y1=d.target.y+d.ty+d.dy/2;return"M"+x0+","+y0+"C"+x2+","+y0+" "+x3+","+y1+" "+x1+","+y1}return link.curvature=function(_){return arguments.length?(curvature=+_,link):curvature},link},sankey},esm=__webpack_require__(153),NumberFormatterRegistrySingleton=__webpack_require__(552),NumberFormats=__webpack_require__(47),propTypes={data:prop_types_default.a.arrayOf(prop_types_default.a.shape({source:prop_types_default.a.string,target:prop_types_default.a.string,value:prop_types_default.a.number})),width:prop_types_default.a.number,height:prop_types_default.a.number,colorScheme:prop_types_default.a.string},formatNumber=Object(NumberFormatterRegistrySingleton.b)(NumberFormats.a.FLOAT);function Sankey(a,b){function d(a){o.html(function(){return function c(a){var b;if(a.sourceLinks)b=a.name+" Value: <span class='emph'>"+formatNumber(a.value)+"</span>";else{var c=formatNumber(a.value),d=d3_default.a.round(a.value/a.source.value*100,1),e=d3_default.a.round(a.value/a.target.value*100,1);b=["<div class=''>Path Value: <span class='emph'>",c,"</span></div>","<div class='percents'>","<span class='emph'>",Number.isFinite(d)?d:"100","%</span> of ",a.source.name,"<br/>","<span class='emph'>"+(Number.isFinite(e)?e:"--")+"%</span> of ",a.target.name,"target","</div>"].join("")}return b}(a)}).transition().duration(200).style("left",d3_default.a.event.offsetX+10+"px").style("top",d3_default.a.event.offsetY+10+"px").style("opacity",.95)}function e(){o.transition().duration(100).style("opacity",0)}var f=b.data,g=b.width,h=b.height,i=b.colorScheme,j=d3_default.a.select(a);j.classed("superset-legacy-chart-sankey",!0);var k_top=5,k_right=5,k_bottom=5,k_left=5,l=g-k_left-k_right,m=h-k_top-k_bottom;j.selectAll("*").remove();var n=j.append("svg").attr("width",l+k_left+k_right).attr("height",m+k_top+k_bottom).append("g").attr("transform","translate("+k_left+","+k_top+")"),o=j.append("div").attr("class","sankey-tooltip").style("opacity",0),p=esm.b.getScale(i),q=src_sankey().nodeWidth(15).nodePadding(10).size([l,m]),r=q.link(),s={},t=f.map(function(a){var b=Object.assign({},a);return b.source=s[b.source]||(s[b.source]={name:b.source}),b.target=s[b.target]||(s[b.target]={name:b.target}),b.value=+b.value,b});s=d3_default.a.values(s),q.nodes(s).links(t).layout(32);var u=n.append("g").selectAll(".link").data(t).enter().append("path").attr("class","link").attr("d",r).style("stroke-width",function(a){return Math.max(1,a.dy)}).sort(function(c,a){return a.dy-c.dy}).on("mouseover",d).on("mouseout",e),v=n.append("g").selectAll(".node").data(s).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"}).call(d3_default.a.behavior.drag().origin(function(a){return a}).on("dragstart",function(){this.parentNode.appendChild(this)}).on("drag",function(a){d3_default.a.select(this).attr("transform","translate("+a.x+","+(a.y=Math.max(0,Math.min(h-a.dy,d3_default.a.event.y)))+")"),q.relayout(),u.attr("d",r)}));v.append("rect").attr("height",function(a){return a.dy>5?a.dy:5}).attr("width",q.nodeWidth()).style("fill",function(a){var b=a.name||"N/A";return a.color=p(b.replace(/ .*/,"")),a.color}).style("stroke",function(a){return d3_default.a.rgb(a.color).darker(2)}).on("mouseover",d).on("mouseout",e),v.append("text").attr("x",-6).attr("y",function(a){return a.dy/2}).attr("dy",".35em").attr("text-anchor","end").attr("transform",null).text(function(a){return a.name}).filter(function(a){return a.x<l/2}).attr("x",6+q.nodeWidth()).attr("text-anchor","start")}Sankey.displayName="Sankey",Sankey.propTypes=propTypes;var esm_Sankey=Sankey;__webpack_exports__.default=Object(reactify.a)(esm_Sankey)}}]);
//# sourceMappingURL=6.5b638ec6de64a70728a6.bundle.js.map