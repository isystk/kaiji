﻿var tfb={};tfb.allowedLabels=["follow-me","follow-us","follow","my-twitter"];tfb.defaultTop=78;tfb.defaultColor="#35ccff";tfb.isInArray=function(str,ar){if(ar.length<1)return;for(var i=0;i<ar.length;i++){if(ar[i]==str){return true;break;}}
return false;}
tfb.showbadge=function(){if(!window.XMLHttpRequest){return;}
if(document.getElementById('twitterFollowBadge')){document.body.removeChild(document.getElementById('twitterFollowBadge'));}
if(tfb.top<0||tfb.top>1000||isNaN(tfb.top)){tfb.top=tfb.defaultTop;}
if(!tfb.isInArray(tfb.label,tfb.allowedLabels)){tfb.label=tfb.allowedLabels[0];}
var validColorPattern=/^#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/;if(!validColorPattern.test(tfb.color)||(tfb.color.length!=4&&tfb.color.length!=7)){tfb.color=tfb.defaultColor;};if(tfb.side!='l'){tfb.side='r';}
tfb.tabStyleCode='position:fixed;'+'top:'+tfb.top+'px;'+'width:30px;'+'height:119px;'+'z-index:8765;'+'cursor:pointer;'+'background:'+tfb.color+' url(http://www.go2web20.net/twitterfollowbadge/1.0/bg-badge/'+tfb.label+'.png);'+'background-repeat:no-repeat;';tfb.aboutStyleCode='position:fixed;'+'top:'+(parseInt(tfb.top)+107)+'px;'+'width:10px;'+'height:11px;'+'z-index:9876;'+'cursor:pointer;'+'background:url(http://www.go2web20.net/twitterfollowbadge/1.0/icon-about.png);'+'background-repeat:no-repeat;';if(tfb.side=='l'){tfb.tabStyleCode+='left:0; background-position:right top;';tfb.aboutStyleCode+='left:0;';}else{tfb.tabStyleCode+='right:0; background-position:left top;';tfb.aboutStyleCode+='right:0;';}
tfbMainDiv=document.createElement('div');tfbMainDiv.setAttribute('id','twitterFollowBadge');document.body.appendChild(tfbMainDiv);tfbMainDiv.innerHTML='<div id="tfbTab" style="'+tfb.tabStyleCode+'"></div><div id="tfbAbout" style="'+tfb.aboutStyleCode+'"></div>'+'<style>#tfbAbout{visibility:hidden;} #twitterFollowBadge:hover #tfbAbout{visibility:visible;}</style>';document.getElementById('tfbTab').onclick=function(){window.open('http://www.go2web20.net/twitterfollowbadge/redir.htm?'+tfb.account);}
document.getElementById('tfbAbout').onclick=function(){window.open('http://www.go2web20.net/twitterFollowBadge/');}}