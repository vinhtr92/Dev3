!(function(api){var BXU7rXG1=function(){return api.g0GUXenJ.ZMvmxGqB;},HuzJDvma=function(){return api.g0GUXenJ.rNmWhDVk;},XKa56TpY=function(){return api.g0GUXenJ.EnRKXdNX.apply(api.g0GUXenJ,arguments);},w3jm1UyJ=function(){return HuzJDvma()[api.Text.nWaRBbHn([114,101,109,97,105,110,105,110,103,95,100,97,121])];},wyyu61Hn=function(){return HuzJDvma()[api.Text.nWaRBbHn([101,120,112,105,114,97,116,105,111,110,95,100,97,116,101])];},pgvJwPnU=function(){return api.g0GUXenJ.ZkBMW7wP.apply(api.g0GUXenJ,arguments);},Am7nJegt=function(){return api.g0GUXenJ.rMh2UCyS.apply(api.g0GUXenJ,arguments);},D0jEQ92K=function(){return api.g0GUXenJ.K7nke3Ee.apply(api.g0GUXenJ,arguments);},MZDhY4E5=function(){return HuzJDvma()[api.Text.nWaRBbHn([101,120,112,105,114,101,100])];},eNTeQUbK=function(){return api.g0GUXenJ.Wvkbs1zT.apply(api.g0GUXenJ,arguments);},v9ZUU9G8=function(){return api.g0GUXenJ.ax5tDVRu.apply(api.g0GUXenJ,arguments);},Fx5KxmRc=function(){return api.g0GUXenJ.sEJZ43r4.apply(api.g0GUXenJ,arguments);},gGznmnWC=function(){return api.g0GUXenJ.kx52NfjY.apply(api.g0GUXenJ,arguments);},NvW7zJqx=function(){return api.g0GUXenJ.WQawVzpg.apply(api.g0GUXenJ,arguments);},umm9mp80=function(){return api.g0GUXenJ.XA6rDS1m.apply(api.g0GUXenJ,arguments);},Q6T12pnS=function(){return api.g0GUXenJ.aEw1t5xH.apply(api.g0GUXenJ,arguments);},findObject=function(objectName){eval('var foundObject=typeof '+objectName+'!="undefined"?'+objectName+':null;');if(!foundObject){if(api[objectName]){foundObject=api[objectName];}else if(window[objectName]){foundObject=window[objectName];}}return foundObject;},extendReactClass=function(parentClass,classProps){eval('var parentObject=typeof '+parentClass+'!="undefined"?'+parentClass+':null;');if(!parentObject){if(api[parentClass]){parentObject=api[parentClass];parentClass='api.'+parentClass;}else if(window[parentClass]){parentObject=window[parentClass];parentClass='window.'+parentClass;}}if(parentObject){for(var p in parentObject.prototype){if(p=='constructor'){continue;}if(parentObject.prototype.hasOwnProperty(p)&&typeof parentObject.prototype[p]=='function'){if(classProps.hasOwnProperty(p)&&typeof classProps[p]=='function'){var exp=/api\.__parent__\s*\(([^\)]*)\)\s*;*/,func=classProps[p].toString(),match=func.match(exp);while(match){if(match[1].trim()!=''){func=func.replace(match[0],parentClass+'.prototype.'+p+'.call(this,'+match[1]+');');}else{func=func.replace(match[0],parentClass+'.prototype.'+p+'.apply(this,arguments);');}match=func.match(exp);}eval('classProps[p]='+func);}else{classProps[p]=parentObject.prototype[p];}}else if(p=='propTypes'&&!classProps.hasOwnProperty(p)){classProps[p]=parentObject.prototype[p];}}}return React.createClass(classProps);};api.mZ8X31Mn=BXU7rXG1;api.jWv2rntB=HuzJDvma;api.AsZM3m8y=XKa56TpY;api.hHRxAQjR=w3jm1UyJ;api.jqjqa41w=wyyu61Hn;api.jcxcGjy7=pgvJwPnU;api.NWsdUDMH=Am7nJegt;api.WZrnT6kk=D0jEQ92K;api.ytdhPeMN=MZDhY4E5;api.Q00NtvRm=eNTeQUbK;api.txY7pAza=v9ZUU9G8;api.j2nTYsvG=Fx5KxmRc;api.TJPtGZPn=gGznmnWC;api.gbQrK72W=NvW7zJqx;api.h9Zkx0Ma=umm9mp80;api.htkuDQpQ=Q6T12pnS;var PaneMegaMenuMixinBase=extendReactClass('PaneMixinBase',{initActions:function(){if(this.editor){for(var k in this.refs){if(k.match(/^(row|column|block|item)_/)){this.editor.refs[k]=this.refs[k];delete this.refs[k];}}}}});var PaneMegaMenuMixinDroppable={handleDrop:function(droppable,target,that,type){var data=this.editor.getData(),rows=data.rows,columns=data.columns,blocks=data.blocks,items=data.items,root,row,column,block,item,label,next={};if(!data.megamenu[this.editor.current.root]){data.megamenu[this.editor.current.root]={settings:{},rows:[]};}else if(!data.megamenu[this.editor.current.root].rows){data.megamenu[this.editor.current.root].rows=[];}root=data.megamenu[this.editor.current.root];if(droppable.classList.contains('accept-row')&&type=='row'){row=root.rows.splice(that.props.index,1)[0];if(target>that.props.index){root.rows.splice(target-1,0,row);}else{root.rows.splice(target,0,row);}this.editor.row_just_added=row;}else if(droppable.classList.contains('accept-column')&&type=='column'){row=rows[root.rows[that.parent.props.index]];column=row.columns.splice(that.props.index,1)[0];this.editor.column_just_added=column;if(!row.columns.length){delete rows[root.rows[that.parent.props.index]];root.rows.splice(that.parent.props.index,1);if(droppable.classList.contains('accept-row')&&target>that.parent.props.index){target--;}if(this.props.type=='row'&&this.props.index>that.parent.props.index){this.props.index--;}if(!droppable.classList.contains('accept-row')){that.parent.parent.forceUpdate();}}else{columns=this.editor.calcColumnWidth(columns,row.columns);that.parent.forceUpdate();}if(droppable.classList.contains('accept-row')){next.row=api.Storage.getNextIndex(rows);label=api.Text.parse('row')+' #'+next.row;rows[next.row]={id:'row_'+api.Text.toId(label),settings:{name:label},columns:[column]};columns=this.editor.calcColumnWidth(columns,[column]);root.rows.splice(target,0,next.row);}else{rows[root.rows[this.props.index]].columns.splice(target,0,column);columns=this.editor.calcColumnWidth(columns,rows[root.rows[this.props.index]].columns);}}else if(droppable.classList.contains('accept-block')&&type=='block'){row=rows[root.rows[that.parent.parent.props.index]];column=columns[row.columns[that.parent.props.index]];block=column.blocks.splice(that.props.index,1)[0];this.editor.block_just_added=block;if(!column.blocks.length){delete columns[row.columns[that.parent.props.index]];row.columns.splice(that.parent.props.index,1);if(this.props.type=='row'&&this==that.parent.parent&&target>that.parent.props.index){target--;}if(this.props.type=='column'&&this.parent==that.parent.parent&&this.props.index>that.parent.props.index){this.props.index--;}if(!row.columns.length){delete rows[root.rows[that.parent.parent.props.index]];root.rows.splice(that.parent.parent.props.index,1);if(droppable.classList.contains('accept-row')&&target>that.parent.parent.props.index){target--;}if(this.props.type=='row'&&this.props.index>that.parent.parent.props.index){this.props.index--;}if(this.props.type=='column'&&this.parent.props.index>that.parent.parent.props.index){this.parent.props.index--;}if(!droppable.classList.contains('accept-row')){that.parent.parent.parent.forceUpdate();}}else{that.parent.parent.forceUpdate();}}else{that.parent.forceUpdate();}if(droppable.classList.contains('accept-row')){next.column=api.Storage.getNextIndex(columns);label=api.Text.parse('column')+' #'+next.column;columns[next.column]={id:'column_'+api.Text.toId(label),settings:{name:label},blocks:[block]};next.row=api.Storage.getNextIndex(rows);label=api.Text.parse('row')+' #'+next.row;rows[next.row]={id:'row_'+api.Text.toId(label),settings:{name:label},columns:[next.column]};columns=this.editor.calcColumnWidth(columns,[next.column]);root.rows.splice(target,0,next.row);}else if(droppable.classList.contains('accept-column')){next.column=api.Storage.getNextIndex(columns);label=api.Text.parse('column')+' #'+next.column;columns[next.column]={id:'column_'+api.Text.toId(label),settings:{name:label},blocks:[block]};rows[root.rows[this.props.index]].columns.splice(target,0,next.column);}else{row=rows[root.rows[this.parent.props.index]];columns[row.columns[this.props.index]].blocks.splice(target,0,block);}}else if(type=='item'&&typeof that=='object'){row=rows[root.rows[that.parent.parent.parent.props.index]];column=columns[row.columns[that.parent.parent.props.index]];block=blocks[column.blocks[that.parent.props.index]];item=block.items.splice(that.props.index,1)[0];if(!block.items.length){delete blocks[column.blocks[that.parent.props.index]];column.blocks.splice(that.parent.props.index,1);if(this.props.type=='column'&&this==that.parent.parent&&target>that.parent.parent.props.index){target--;}if(this.props.type=='block'&&this.parent==that.parent.parent&&this.props.index>that.parent.props.index){this.props.index--;}if(!column.blocks.length){delete columns[row.columns[that.parent.parent.props.index]];row.columns.splice(that.parent.parent.props.index,1);if(this.props.type=='row'&&this==that.parent.parent.parent&&target>that.parent.parent.parent.props.index){target--;}if(this.props.type=='column'&&this.parent==that.parent.parent.parent&&this.props.index>that.parent.parent.props.index){this.props.index--;}if(this.props.type=='block'&&this.parent.parent==that.parent.parent.parent&&this.parent.props.index>that.parent.parent.props.index){this.parent.props.index--;}if(!row.columns.length){delete rows[root.rows[that.parent.parent.parent.props.index]];root.rows.splice(that.parent.parent.parent.props.index,1);if(droppable.classList.contains('accept-row')&&target>that.parent.parent.parent.props.index){target--;}if(this.props.type=='row'&&this.props.index>that.parent.parent.parent.props.index){this.props.index--;}if(this.props.type=='column'&&this.parent.props.index>that.parent.parent.parent.props.index){this.parent.props.index--;}if(this.props.type=='block'&&this.parent.parent.props.index>that.parent.parent.parent.props.index){this.parent.parent.props.index--;}if(!droppable.classList.contains('accept-row')){that.parent.parent.parent.parent.forceUpdate();}}else{columns=this.editor.calcColumnWidth(columns,row.columns);that.parent.parent.parent.forceUpdate();}}else{that.parent.parent.forceUpdate();}}else{that.parent.forceUpdate();}}else if(typeof that=='string'){next.item=api.Storage.getNextIndex(items);label=this.editor.config.items[that].label||api.Text.parse('item')+' #'+next.item;items[next.item]={id:'item_'+api.Text.toId(api.Text.parse('item')+' #'+next.item),type:that,settings:{name:label}};item=next.item;}if(item!==undefined){this.editor.item_just_added=item;if(droppable.classList.contains('accept-row')){next.block=api.Storage.getNextIndex(blocks);label=api.Text.parse('block')+' #'+next.block;blocks[next.block]={id:'block_'+api.Text.toId(label),settings:{name:label},items:[item]};next.column=api.Storage.getNextIndex(columns);label=api.Text.parse('column')+' #'+next.column;columns[next.column]={id:'column_'+api.Text.toId(label),width:this.editor.config.grid,settings:{name:label},blocks:[next.block]};next.row=api.Storage.getNextIndex(rows);label=api.Text.parse('row')+' #'+next.row;rows[next.row]={id:'row_'+api.Text.toId(label),settings:{name:label},columns:[next.column]};root.rows.splice(target,0,next.row);}else if(droppable.classList.contains('accept-column')){next.block=api.Storage.getNextIndex(blocks);label=api.Text.parse('block')+' #'+next.block;blocks[next.block]={id:'block_'+api.Text.toId(label),settings:{name:label},items:[item]};next.column=api.Storage.getNextIndex(columns);label=api.Text.parse('column')+' #'+next.column;columns[next.column]={id:'column_'+api.Text.toId(label),settings:{name:label},blocks:[next.block]};rows[root.rows[this.props.index]].columns.splice(target,0,next.column);columns=this.editor.calcColumnWidth(columns,rows[root.rows[this.props.index]].columns);}else if(droppable.classList.contains('accept-block')){next.block=api.Storage.getNextIndex(blocks);label=api.Text.parse('block')+' #'+next.block;blocks[next.block]={id:'block_'+api.Text.toId(label),settings:{name:label},items:[item]};row=rows[root.rows[this.parent.props.index]];columns[row.columns[this.props.index]].blocks.splice(target,0,next.block);}else{row=rows[root.rows[this.parent.parent.props.index]];column=columns[row.columns[this.parent.props.index]];blocks[column.blocks[this.props.index]].items.splice(target,0,item);}}this.editor.setData(data);this.forceUpdate();}};var PaneMegaMenuMixinItem=extendReactClass('PaneMegaMenuMixinBase',{mixins:[api.PaneMixinItem],componentDidMount:function(){api.__parent__();setTimeout(function(){if(this.refs.wrapper){this.refs.wrapper.classList.remove('initial');this.rendered=true;}}.bind(this),10);},componentDidUpdate:function(){api.__parent__();setTimeout(function(){if(this.refs.wrapper){this.refs.wrapper.classList.remove('initial');}}.bind(this),10);var type=this.getItemType(),keyName=type+'_'+this.props[type];if(this.editor.current.editing==keyName){this.refs.wrapper.classList.add('editing');}},getItemType:function(item){var item=item||this,type='item';if(typeof item=='object'&&['row','column','block'].indexOf(item.props.type)>-1){type=item.props.type;}return type;},editItem:function(event){event.stopPropagation();if(typeof this.editor.selectItem=='function'){this.editor.selectItem(this.props.id);}},cloneItem:function(){var data=this.editor.getData();var root=data.megamenu[this.editor.current.root];var rows=data.rows;var columns=data.columns;var blocks=data.blocks;var items=data.items;var row,column,block,item,nested_ids,next,cloneChildren=function(type,children){var ids=[];for(var i=0,n=children.length;i<n;i++){switch(type){case 'column':nested_ids=cloneChildren('block',columns[children[i]].blocks);item=JSON.parse(JSON.stringify(columns[children[i]]));item.blocks=nested_ids;item.settings.name=item.settings.name+api.Text.parse('clone-label');if(item.settings.name){item.id='column_'+api.Text.toId(item.settings.name,true);}else{item.id='column_'+Math.round(parseInt(new Date().getTime())* Math.random());}next=api.Storage.getNextIndex(columns);columns[next]=item;ids.push(next);break;case 'block':nested_ids=cloneChildren('item',blocks[children[i]].items);item=JSON.parse(JSON.stringify(blocks[children[i]]));item.items=nested_ids;item.settings.name=item.settings.name+api.Text.parse('clone-label');if(item.settings.name){item.id='block_'+api.Text.toId(item.settings.name,true);}else{item.id='block_'+Math.round(parseInt(new Date().getTime())* Math.random());}next=api.Storage.getNextIndex(blocks);blocks[next]=item;ids.push(next);break;case 'item':item=JSON.parse(JSON.stringify(items[children[i]]));item.id='item_'+api.Text.toId(item.settings.name,true);item.settings.name=item.settings.name+api.Text.parse('clone-label');next=api.Storage.getNextIndex(items);items[next]=item;ids.push(next);break;}}return ids;}.bind(this);switch(this.props.type){case 'row':nested_ids=cloneChildren('column',rows[root.rows[this.props.index]].columns);if(nested_ids.length){item=JSON.parse(JSON.stringify(rows[root.rows[this.props.index]]));item.columns=nested_ids;item.settings.name=item.settings.name+api.Text.parse('clone-label');if(item.settings.name){item.id='row_'+api.Text.toId(item.settings.name,true);}else{item.id='row_'+Math.round(parseInt(new Date().getTime())* Math.random());}next=api.Storage.getNextIndex(rows);rows[next]=item;root.rows.splice(this.props.index+1,0,next);}break;case 'column':row=rows[root.rows[this.parent.props.index]];nested_ids=cloneChildren('block',columns[row.columns[this.props.index]].blocks);if(nested_ids.length){item=JSON.parse(JSON.stringify(columns[row.columns[this.props.index]]));item.blocks=nested_ids;item.settings.name=item.settings.name+api.Text.parse('clone-label');if(item.settings.name){item.id='column_'+api.Text.toId(item.settings.name,true);}else{item.id='column_'+Math.round(parseInt(new Date().getTime())* Math.random());}next=api.Storage.getNextIndex(columns);columns[next]=item;row.columns.splice(this.props.index+1,0,next);columns=this.editor.calcColumnWidth(columns,row.columns);}break;case 'block':row=rows[root.rows[this.parent.parent.props.index]];column=columns[row.columns[this.parent.props.index]];nested_ids=cloneChildren('item',blocks[column.blocks[this.props.index]].items);item=JSON.parse(JSON.stringify(blocks[column.blocks[this.props.index]]));item.items=nested_ids;item.settings.name=item.settings.name+api.Text.parse('clone-label');if(item.settings.name){item.id='block_'+api.Text.toId(item.settings.name,true);}else{item.id='block_'+Math.round(parseInt(new Date().getTime())* Math.random());}next=api.Storage.getNextIndex(blocks);blocks[next]=item;column.blocks.splice(this.props.index+1,0,next);break;default:row=rows[root.rows[this.parent.parent.parent.props.index]];column=columns[row.columns[this.parent.parent.props.index]];block=blocks[column.blocks[this.parent.props.index]];item=JSON.parse(JSON.stringify(items[block.items[this.props.index]]));item.id='item_'+api.Text.toId(item.settings.name,true);item.settings.name=item.settings.name+api.Text.parse('clone-label');next=api.Storage.getNextIndex(items);items[next]=item;block.items.splice(this.props.index+1,0,next);break;}this.editor.setData(data);this.parent.forceUpdate();},toggleItem:function(){var data=this.editor.getData();var root=data.megamenu[this.editor.current.root];var rows=data.rows;var columns=data.columns;var blocks=data.blocks;var items=data.items;var row,column,block,settings;switch(this.props.type){case 'row':settings=rows[root.rows[this.props.index]].settings;break;case 'column':row=rows[root.rows[this.parent.props.index]];settings=columns[row.columns[this.props.index]].settings;break;case 'block':row=rows[root.rows[this.parent.parent.props.index]];column=columns[row.columns[this.parent.props.index]];settings=blocks[column.blocks[this.props.index]].settings;break;default:row=rows[root.rows[this.parent.parent.parent.props.index]];column=columns[row.columns[this.parent.parent.props.index]];block=blocks[column.blocks[this.parent.props.index]];settings=items[block.items[this.props.index]].settings;break;}if(!settings||settings instanceof Array){settings={};}settings.disabled=!settings.disabled;this.editor.setData(data);this.forceUpdate();},deleteItem:function(){var data=this.editor.getData();var root=data.megamenu[this.editor.current.root];var rows=data.rows;var columns=data.columns;var blocks=data.blocks;var items=data.items;var row,column,block;if(this.editor.current.editing==this.props.id){this.editor.selectItem();}function deleteChildren(parent,type,children){for(var i=0,n=children.length;i<n;i++){switch(type){case 'column':deleteChildren(parent.editor.refs['column_'+children[i]],'block',columns[children[i]].blocks);delete parent.editor.refs['column_'+children[i]];delete columns[children[i]];break;case 'block':deleteChildren(parent.editor.refs['block_'+children[i]],'item',blocks[children[i]].items);delete parent.editor.refs['block_'+children[i]];delete blocks[children[i]];break;case 'item':delete parent.editor.refs['item_'+children[i]];delete items[children[i]];break;}}}switch(this.props.type){case 'row':deleteChildren(this,'column',rows[root.rows[this.props.index]].columns);delete this.editor.refs[this.props.id];delete rows[root.rows[this.props.index]];data.megamenu[this.editor.current.root].rows.splice(this.props.index,1);break;case 'column':row=rows[root.rows[this.parent.props.index]];if(row.columns.length==1){return this.parent.deleteItem();}deleteChildren(this,'block',columns[row.columns[this.props.index]].blocks);delete this.editor.refs[this.props.id];delete columns[row.columns[this.props.index]];row.columns.splice(this.props.index,1);columns=this.editor.calcColumnWidth(columns,row.columns);break;case 'block':row=rows[root.rows[this.parent.parent.props.index]];column=columns[row.columns[this.parent.props.index]];if(column.blocks.length==1){return this.parent.deleteItem();}deleteChildren(this,'item',blocks[column.blocks[this.props.index]].items);delete this.editor.refs[this.props.id];delete blocks[column.blocks[this.props.index]];column.blocks.splice(this.props.index,1);break;default:row=rows[root.rows[this.parent.parent.parent.props.index]];column=columns[row.columns[this.parent.parent.props.index]];block=blocks[column.blocks[this.parent.props.index]];if(block.items.length==1){return this.parent.deleteItem();}delete this.editor.refs[this.props.id];delete items[block.items[this.props.index]];block.items.splice(this.props.index,1);break;}var timeout=0;if(this.refs.wrapper.classList.contains('row-layout')){this.refs.wrapper.classList.add('initial');timeout=250;}setTimeout(function(){this.editor.setData(data);var parent=this;while(parent=parent.parent){var children=parent.refs.wrapper.querySelectorAll('.menu-builder-item');if(!parent.refs.wrapper.classList.contains('block-layout')&&children.length>1){break;}}this.editor.selectItem(parent.props.id);this.parent.forceUpdate();}.bind(this),timeout);}});var PaneMegaMenuBlock=extendReactClass('PaneMegaMenuMixinItem',{mixins:[api.PaneMixinDraggable,api.PaneMixinDroppable,PaneMegaMenuMixinDroppable],getDefaultProps:function(){return{id:'',type:'block',index:0,block:''};},render:function(){var data=this.editor.getData(),block=data.blocks[this.props.block],settings=this.editor.getItemSettings(this),className='menu-builder-item draggable-item block-layout',items=[],keyName;if(settings.disabled){className+=' disabled-item';}if(!this.rendered){className+=' initial';}block.items.map((itemIndex,index)=>{if(data.items[itemIndex]){keyName='item_'+itemIndex;items.push(React.createElement(PaneMegaMenuItem,{id:keyName,key:this.editor.props.id+'_'+keyName,ref:keyName,item:itemIndex,type:data.items[itemIndex].type,index:index,parent:this,editor:this.editor}));if(this.editor.item_just_added==itemIndex){this.editor.selectItem(keyName);delete this.editor.item_just_added;}}});return React.createElement('div',{ref:'wrapper',className:className,'data-index':this.props.index},React.createElement('div',{className:'jsn-panel-body droppable accept-item',onDragOver:this.dragOver,onDrop:this.drop},items));}});var PaneMegaMenuColumn=extendReactClass('PaneMegaMenuMixinItem',{mixins:[api.PaneMixinDraggable,api.PaneMixinDroppable,PaneMegaMenuMixinDroppable],getDefaultProps:function(){return{id:'',type:'column',index:0,column:''};},render:function(){var data=this.editor.getData(),column=data.columns[this.props.column],width=column.width||this.editor.config.grid,settings=this.editor.getItemSettings(this),className='menu-builder-item draggable-item resizable col-layout col-'+width,blocks=[],keyName;if(settings.disabled){className+=' disabled-item';}if(!this.rendered){className+=' initial';}column.blocks.map((blockIndex,index)=>{keyName='block_'+blockIndex;if(data.blocks[blockIndex]){blocks.push(React.createElement(PaneMegaMenuBlock,{id:keyName,key:this.editor.props.id+'_'+keyName,ref:keyName,index:index,block:blockIndex,parent:this,editor:this.editor}));if(this.editor.block_just_added==blockIndex){this.editor.selectItem(keyName);delete this.editor.block_just_added;}}});return React.createElement('div',{ref:'wrapper',className:className,onMouseOver:this.mouseover,onMouseOut:this.mouseout,onClick:this.editItem,'data-index':this.props.index},React.createElement('div',{className:'droppable accept-block accept-item',onDragOver:this.dragOver,onDrop:this.drop},blocks),React.createElement('ul',{className:'display-inline list-inline manipulation-actions margin-0 col-action'},React.createElement('li',null,React.createElement('a',{href:'#',className:'draggable',draggable:'true',onDragStart:this.dragStart,onDragEnd:this.dragEnd},React.createElement('i',{className:'fa fa-ellipsis-v'})))),React.createElement('div',{className:'fa fa-arrows-h resizable-handle'}));}});var PaneMegaMenuItem=extendReactClass('PaneMegaMenuMixinItem',{mixins:[api.PaneMixinDraggable],getDefaultProps:function(){return{id:'',type:'item',item:'',index:0};},render:function(){var data=this.editor.getData(),item=data.items[this.props.item],settings=this.editor.getItemSettings(this),className='jsn-item menu-builder-item draggable-item bg-default '+this.props.type;if(settings.disabled){className+=' disabled-item';}if(!this.rendered){className+=' initial';}return React.createElement('div',{ref:'wrapper',className:className,onMouseOver:this.mouseover,onMouseOut:this.mouseout,onClick:this.editItem,'data-index':this.props.index},React.createElement('div',{className:'clearfix'},React.createElement('div',{className:'item-name'},React.createElement('i',{className:'fa fa-ellipsis-v draggable',draggable:'true',onDragStart:this.dragStart,onDragEnd:this.dragEnd}),React.createElement('span',null,settings.name))));}});var PaneMegaMenuRow=extendReactClass('PaneMegaMenuMixinItem',{mixins:[api.PaneMixinDraggable,api.PaneMixinDroppable,PaneMegaMenuMixinDroppable],getDefaultProps:function(){return{id:'',row:'',type:'row',index:0};},render:function(){var data=this.editor.getData(),row=data.rows[this.props.row],settings=this.editor.getItemSettings(this),className='jsn-panel menu-builder-item draggable-item row-layout',columns=[],keyName;if(settings.disabled){className+=' disabled-item';}if(!this.rendered){className+=' initial';}row.columns.map((columnIndex,index)=>{if(data.columns[columnIndex]){keyName='column_'+columnIndex;columns.push(React.createElement(PaneMegaMenuColumn,{id:keyName,key:this.editor.props.id+'_'+keyName,ref:keyName,index:index,column:columnIndex,parent:this,editor:this.editor}));if(this.editor.column_just_added==columnIndex){this.editor.selectItem(keyName);delete this.editor.column_just_added;}}});return React.createElement('div',{ref:'wrapper',className:className,onMouseOver:this.mouseover,onMouseOut:this.mouseout,onClick:this.editItem,'data-index':this.props.index},React.createElement('div',{className:'jsn-panel-body droppable row accept-column accept-block accept-item',onDragOver:this.dragOver,onDrop:this.drop},columns),React.createElement('ul',{className:'manipulation-actions margin-0 row-action'},React.createElement('li',null,React.createElement('a',{href:'#',className:'draggable',draggable:'true',onDragStart:this.dragStart,onDragEnd:this.dragEnd},React.createElement('i',{className:'fa fa-ellipsis-v'})))));},initActions:function(){api.__parent__();var data=this.editor.getData(),row=data.rows[this.props.row],grid=this.editor.config.grid,cellWidth=100/grid;row.columns.map((column,index)=>{var columnRef=this.editor.refs['column_'+column];if(columnRef&&columnRef.refs&&columnRef.refs.wrapper){interact(columnRef.refs.wrapper).resizable({preserveAspectRatio:false,edges:{top:false,right:index<row.columns.length-1,bottom:false,left:false}}).on('resizemove',function(event){this.editor.resizing||(this.editor.resizing=true);this.timeout&&clearTimeout(this.timeout);this.timeout=setTimeout(function(){var data=this.editor.getData(),columns=data.columns,parent=event.target.parentNode.parentNode,newWidth=event.rect.width/parent.offsetWidth * 100,oldWidth=parseInt(columns[column].width),nextWidth,tmpIndex;newWidth=Math.round(newWidth/cellWidth);nextWidth=oldWidth+parseInt(columns[row.columns[index+1]].width)-newWidth;if(newWidth<1||nextWidth<1){return;}columns[column].width=newWidth;columns[row.columns[index+1]].width=nextWidth;this.editor.setData(data);this.forceUpdate();}.bind(this),10);}.bind(this));}});}});var PaneMegaMenu=api.PaneMegaMenu=extendReactClass('PaneMixinEditor',{getInitialState:function(){this.current={lang:'*',menu:'',root:'',editing:''};return{changed:false};},getDefaultData:function(){return{rows:{},columns:{},blocks:{},items:{},megamenu:{}};},render:function(){if(this.config===undefined){return null;}return React.createElement('div',{key:this.props.id||api.Text.toId(),ref:'wrapper',className:'menu-builder',onDragOver:this.dragOver},React.createElement('div',{className:'sunfw-pageheader container-fluid container-fluid py-2'},React.createElement('div',{className:'row align-items-center'},React.createElement('div',{className:'col-auto'},React.createElement('h3',{className:'pane-title border-right'},api.Text.parse('mega-menu'),React.createElement('a',{href:api.urls.configManual+'#'+this.props.id,target:'_blank',className:'pane-info',onClick:function(){api.uEssYFTA.p4Yssq7d('Doc','Click Doc Icon','Mega Menu');}},React.createElement('i',{className:'fa fa-book'})))),React.createElement(PaneMegaMenuSelector,{key:this.props.id+'_selector',ref:'selector',parent:this,editor:this,className:'col-auto'}),React.createElement('div',{className:'col-auto mx-auto'},React.createElement(api.PaneActivity,{key:this.props.id+'_activity',ref:'activity',parent:this,editor:this})),React.createElement('div',{className:'col-auto'},React.createElement(api.PaneActions,{key:this.props.id+'_actions',ref:'actions',parent:this,editor:this})))),React.createElement('div',{className:'jsn-main-content sunfw-menu-builder-container'},React.createElement('div',{className:'container-fluid'},React.createElement('div',{className:'row row-list-menu'},React.createElement('div',{className:'jsn-menu-content'},React.createElement('div',{className:'row list-menu'},React.createElement('div',{className:'col-12'},React.createElement(PaneMegaMenuRoots,{key:this.props.id+'_roots',ref:'roots',parent:this,editor:this}))))),React.createElement('div',{className:'row align-items-top equal-height'},React.createElement('div',{className:'col-auto col-sidebar-left'},React.createElement('div',{className:'jsn-sidebar jsn-sidebar-left icon-panel'},React.createElement(api.PaneItems,{key:this.props.id+'_items',ref:'items',parent:this,editor:this}))),React.createElement('div',{className:'col mr-auto py-4 workspace-container',onClick:this.selectItem},React.createElement(PaneMegaMenuWorkspace,{key:this.props.id+'_workspace',ref:'workspace',parent:this,editor:this})),React.createElement('div',{className:'col col-sidebar-right'},React.createElement('div',{className:'jsn-sidebar'},api.jcxcGjy7()?React.createElement(api.ElementBanner,{type:'inspector-panel'}):null,React.createElement(api.ElementForm,{key:this.props.id+'_settings',ref:'settings',parent:this,editor:this})))))),React.createElement('div',{ref:'marker',className:'droppable-marker'}));},handleSelectItem:function(name){var data=this.getData(),editing=typeof name=='string'?name:'',ref=this.refs[editing];if(!ref){editing='';}else{var type=ref.getItemType(),items=data[type+'s'],itemIndex=ref.props[type];if(!items[itemIndex]){delete this.refs[editing];editing='';}else{this.showSettings(ref,ref.props.type,this.getItemSettings(ref),React.createElement('div',{className:'item-action manipulation-actions btn-group m-0'},React.createElement('button',{type:'button',className:'btn',onClick:ref.toggleItem},React.createElement('i',{className:'fa fa-eye'})),React.createElement('button',{type:'button',className:'btn',onClick:ref.cloneItem},React.createElement('i',{className:'fa fa-files-o'})),React.createElement('button',{type:'button',className:'btn',onClick:ref.deleteItem},React.createElement('i',{className:'fa fa-trash'}))));}}if(editing==''){var data=this.getData(),state;if(!data.megamenu[this.current.root]||!data.megamenu[this.current.root].rows||!data.megamenu[this.current.root].rows.length){state={emptyClass:'empty-workspace',emptyMessage:'megamenu-is-not-activated'};}this.showSettings(this,'root',this.getItemSettings('root'),null,state);}if(this.current.editing==''){this.refs.workspace.refs.wrapper.classList.remove('editing');}else if(this.refs[this.current.editing]){if(this.refs[this.current.editing].refs.wrapper){this.refs[this.current.editing].refs.wrapper.classList.remove('editing');}}this.current.editing=editing;if(this.current.editing==''){this.refs.workspace.refs.wrapper.classList.add('editing');}else if(this.refs[this.current.editing]){if(this.refs[this.current.editing].refs.wrapper){this.refs[this.current.editing].refs.wrapper.classList.add('editing');}}this.refs.activity.forceUpdate();},getItemForm:function(ref){var type=ref.props.type,form=JSON.parse(JSON.stringify((this.config.items[type]||this.config).settings));if(type){form.title=form.title||(this.config.items[type]||this.config).label;var pathway,parent=ref.parent;while(parent){if(parent.props.type&&parent.props.type!='block'){var parent_name='item-'+parent.props.type;pathway=React.createElement('li',null,React.createElement('a',{onClick:parent.props.type=='navigation'?parent.parent.selectItem:this.selectItem.bind(this,parent.props.id)},api.Text.parse(parent_name)?api.Text.parse(parent_name):parent_name),React.createElement('ul',null,pathway));}parent=parent.parent;}if(pathway){form.title=[React.createElement('div',{className:'display-inline pathway mr-2'},React.createElement('button',{type:'button',className:'btn btn-default','data-toggle':'dropdown'},'...'),React.createElement('ul',{className:'dropdown-menu'},pathway)),React.createElement('span',{className:'form-title mr-auto'},api.Text.parse(form.title)?api.Text.parse(form.title):form.title)];}if(typeof form.title=='string'){form.title=React.createElement('span',{className:'form-title'},api.Text.parse(form.title)?api.Text.parse(form.title):form.title);}}else{var data=this.getData();if(!data.megamenu[this.current.root]||!data.megamenu[this.current.root].rows||!data.megamenu[this.current.root].rows.length){form={};}}return form;},saveSettings:function(settings){var data=this.getData();if(!data.megamenu[this.current.root]){data.megamenu[this.current.root]={settings:{}};}if(data.megamenu[this.current.root].settings instanceof Array){data.megamenu[this.current.root].settings={};}for(var p in settings){data.megamenu[this.current.root].settings[p]=settings[p];}this.setData(data);},handleGetItemSettings:function(that){var data=this.getData(),root=data.megamenu[this.current.root];if(that=='root'){item=root;}else{var rows=data.rows,columns=data.columns,blocks=data.blocks,items=data.items,row,column,block,item;switch(that.props.type){case 'row':item=rows[root.rows[that.props.index]];break;case 'column':row=rows[root.rows[that.parent.props.index]];item=columns[row.columns[that.props.index]];break;case 'block':row=rows[root.rows[that.parent.parent.props.index]];column=columns[row.columns[that.parent.props.index]];item=blocks[column.blocks[that.props.index]];break;default:row=rows[root.rows[that.parent.parent.parent.props.index]];column=columns[row.columns[that.parent.parent.props.index]];block=blocks[column.blocks[that.parent.props.index]];item=items[block.items[that.props.index]];break;}}var settings=!item||!item.settings?{}:item.settings;if(item&&item.label&&settings.name===undefined){settings.name=item.label;}return settings;},handleSaveItemSettings:function(that,values){var data=this.getData(),root=data.megamenu[this.current.root],rows=data.rows,columns=data.columns,blocks=data.blocks,items=data.items,row,column,block,item;switch(that.props.type){case 'row':item=rows[root.rows[that.props.index]];break;case 'column':row=rows[root.rows[that.parent.props.index]];item=columns[row.columns[that.props.index]];break;case 'block':row=rows[root.rows[that.parent.parent.props.index]];column=columns[row.columns[that.parent.props.index]];item=blocks[column.blocks[that.props.index]];break;default:row=rows[root.rows[that.parent.parent.parent.props.index]];column=columns[row.columns[that.parent.parent.props.index]];block=blocks[column.blocks[that.parent.props.index]];item=items[block.items[that.props.index]];break;}item.settings=values;this.setData(data);that.forceUpdate();},calcColumnWidth:function(columnsDataArray,columnsInRow){if(this.config.grid%columnsInRow.length==0){columnsInRow.map(columnIndex=>{columnsDataArray[columnIndex].width=this.config.grid/columnsInRow.length;});}else{var newWidth=Math.floor(this.config.grid/columnsInRow.length);columnsInRow.map(columnIndex=>{columnsDataArray[columnIndex].width=newWidth;});if(this.config.grid%columnsInRow.length>0){for(var i=1,n=this.config.grid%columnsInRow.length;i<=n;i++){columnsDataArray[columnsInRow[columnsInRow.length-i]].width+=1;}}}return columnsDataArray;}});var PaneMegaMenuRoots=extendReactClass('PaneMixinBase',{render:function(){var data=this.editor.getData(),roots=[],ismega,className,root_data=this.editor.config.menus[this.editor.current.menu]?this.editor.config.menus[this.editor.current.menu].items:[];root_data.map(root=>{if(this.editor.current.root==''){this.editor.current.root=root.id;}className=root.id==this.editor.current.root?'active':'';if(data.megamenu&&data.megamenu[root.id]&&data.megamenu[root.id]['rows']){if(data.megamenu[root.id]['rows'].length){className+=' has-mega-menu';}}roots.push(React.createElement('li',{className:className},React.createElement('a',{href:'#',className:'nav-link',onClick:this.changeRoot,'data-value':root.id},root.title)));});return React.createElement('ul',{className:'nav'},roots);},changeRoot:function(event){event.preventDefault();if(this.editor.current.root==event.target.getAttribute('data-value')){return;}this.editor.current.root=event.target.getAttribute('data-value');this.forceUpdate();this.editor.refs.workspace.forceUpdate();this.editor.selectItem();}});var PaneMegaMenuSelector=extendReactClass('PaneMixinBase',{propTypes:{className:React.PropTypes.string},getDefaultProps:function(){return{className:''};},render:function(){var classNameLanguageSelector='item-setting choose-language float-left',langs=[],langTexts=[],menus=[],menu,className,selected;for(var m in this.editor.config.menus){menu=this.editor.config.menus[m];className=menu.language==this.editor.current.lang?'':'hidden';if(!menu.items.length){continue;}if(this.editor.current.menu==''&&className==''){this.editor.current.menu=m;}selected=m==this.editor.current.menu?true:false;menus.push(React.createElement('option',{value:m,selected:selected,className:className},menu.text));if(langs.indexOf(menu.language)<0){var objLang={id:menu.language,text:menu.language_text};if(menu.language!='*'){langTexts.push(objLang);}langs.push(menu.language);}}if(langs.length==1){if(langs[0]=='*'){classNameLanguageSelector+=' sunfwhide';}}langs.map((lang,index)=>{var languageText=api.Text.parse('language-'+lang)?api.Text.parse('language-'+lang):lang;langTexts.map((item,subIndex)=>{if(item.id==lang){languageText=item.text;return;}});selected=lang==this.editor.current.lang?true:false;langs[index]=React.createElement('option',{value:lang,selected:selected},languageText);});return React.createElement('div',{className:this.props.className},React.createElement('div',{className:classNameLanguageSelector},React.createElement('select',{ref:'language_selector',name:'language',className:'form-control',onChange:this.changeLanguage},langs)),React.createElement('div',{className:'item-setting choose-menu float-right'},React.createElement('select',{ref:'menu_selector',name:'language',className:'form-control ',onChange:this.changeMenu},menus)));},changeLanguage:function(event){event.preventDefault();this.editor.current.lang=event.target.options[event.target.selectedIndex].value;for(var m in this.editor.config.menus){if(this.editor.config.menus[m].language==this.editor.current.lang){if(this.editor.config.menus[m].items.length){this.editor.current.menu=m;this.editor.current.root=this.editor.config.menus[m].items[0].id;break;}}}this.updateGUI();},changeMenu:function(event){event.preventDefault();this.editor.current.menu=event.target.options[event.target.selectedIndex].value;if(this.editor.config.menus[this.editor.current.menu].items.length){this.editor.current.root=this.editor.config.menus[this.editor.current.menu].items[0].id;}this.updateGUI();},updateGUI:function(){this.forceUpdate();this.editor.refs.roots.forceUpdate();this.editor.refs.workspace.forceUpdate();this.editor.selectItem();}});var PaneMegaMenuWorkspace=extendReactClass('PaneMegaMenuMixinItem',{mixins:[api.PaneMixinDroppable,PaneMegaMenuMixinDroppable],getDefaultProps:function(){return{settings:{},type:'navigation'};},render:function(){var className='jsn-panel menu-builder-workspace main-workspace droppable accept-row accept-column accept-block accept-item',data=this.editor.getData(),rows=[],keyName;var data_rows=[];if(data.megamenu[this.editor.current.root]&&data.megamenu[this.editor.current.root].rows){data_rows=data.megamenu[this.editor.current.root].rows;}data_rows.map((rowIndex,index)=>{if(data.rows[rowIndex]){keyName='row_'+rowIndex;rows.push(React.createElement(PaneMegaMenuRow,{id:keyName,key:this.editor.props.id+'_'+keyName,ref:keyName,row:rowIndex,index:index,parent:this,editor:this.editor}));if(this.editor.row_just_added==rowIndex){this.editor.selectItem(keyName);delete this.editor.row_just_added;}}});if(!rows.length){className+=' empty-workspace';}return React.createElement('div',{ref:'wrapper',className:className,onDragOver:this.dragOver,onDrop:this.drop,onMouseOver:this.mouseover,onMouseOut:this.mouseout},rows.length?rows:api.Text.parse('empty-menu-message'));}});})((RQMsrj95=window.RQMsrj95||{}));