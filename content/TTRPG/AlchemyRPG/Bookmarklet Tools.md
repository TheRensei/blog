---
title: Bookmarklet Tools
publish: true
tags:
  - alchemyrpg
  - tool
  - ttrpg
  - vtt
icon: LiTriangle
---

I'm using [alchemy](https://app.alchemyrpg.com/) as my main VTT in games. It's great, but sometimes I wish it had more options (like being able to hide or resize panels etc). Thankfully since it's just a webapp it's quite easy to mess around with it using js. 
I'm not a web dev so be careful with any scripts you see here. They work for me now, but this might change whenever alchemy updates or something changes. They don't make changes to your alchemy stuff besides how the page is rendered tho so everything should go back to normal after a quick page refresh!

Firs of all, here is a guide on what bookmarklets are and how to set them up -> [What are bookmarklets?](https://www.freecodecamp.org/news/what-are-bookmarklets/)


# Hide Panels

![[alchemy-panels.webm]]

This bookmarklet adds a couple of buttons that let you toggle side panels.

> [!INFO]- Only Toggle panels
> last updated: 23/03/2025
> ```jsx
> javascript: (() => {
> 	if (document.querySelector('.b-top-right')) return;
> 	
> 	const rootNode = document.querySelector('.css-1nnojw6');
> 	const panelButton = rootNode.querySelector('.css-11p8zb6 > div:nth-child(1)');
> 	const playerPanel = rootNode.querySelector('.css-1u2rm2v');
> 	const scenesPanel = document.querySelector('div.pointer-events-none:nth-child(3) > div:nth-child(2)');
> 	const journalPanel = document.querySelector(".css-1e8w32g");
> 	const parent = document.querySelector(".css-1eciq2");
> 	let skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
> 
> 	const buttonHTML = `<div><div class="css-1y4t6sx"><div class="css-1gsonkp" style="width: 20px;height: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" fill="white" r="5"></circle></svg></div></div></div>`;
> 	
>     const createButton = (className, style) => {
>         const button = document.createElement('div');
>         button.className = className;
>         button.style = style;
>         button.innerHTML = buttonHTML;
>         return button;
>     };
> 
> 	const bStyleRight = `right: 0px;z-index: 110;position: absolute;`;
> 	const bStyleLeft = `z-index: 110;position: absolute;`;
> 
> 	const buttonsRight = [
>         createButton('b-top-right', `${bStyleRight} top: calc(50% - 30px);`),
>         createButton('b-mid-right', `${bStyleRight} top: 50%;`),
>         createButton('b-bot-right', `${bStyleRight} top: calc(50% + 30px);`),
>     ];
> 
>     const buttonsLeft = [
>         createButton('b-top-left', `${bStyleLeft} top: calc(50% - 30px);`),
>         createButton('b-mid-left', `${bStyleLeft} top: 50%;`),
>         createButton('b-bot-left', `${bStyleLeft} top: calc(50% + 30px);`)
>     ];
> 
> 	[...buttonsRight, ...buttonsLeft].forEach(btn => rootNode.prepend(btn));
> 		
> 	const videoButton = document.querySelector(".css-11p8zb6 > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)");	
> 	
> 	let videoPanelFix = function(){
> 		const videoPanel = document.querySelector(".css-1n217zf");
> 		const videoPanelEnabled = videoPanel != null;
> 
> 		if(videoPanel!=null){
> 			
> 			const rightPosition = 
> 			(playerPanel.style.display === 'none' && scenesPanel.style.display === 'flex') 
> 			? "825px" 
> 			: ((playerPanel.style.display === 'none' && scenesPanel.style.display === 'none') 
> 			? "400px" 
> 			: "725px");
> 			panelButton.style.right = videoPanelEnabled ? rightPosition : "0px";
> 		}
> 
> 		buttonsRight.forEach(btn => btn.style.right = videoPanelEnabled ? "375px" : "0px");
> 	};
> 
> 	
> 	if(videoButton != null)
> 	{
> 		videoButton.addEventListener("click", () => {setTimeout(() => { panelSizeEval()}, 100)});
> 	}
> 
> 	let updateCirclesRight = function() {
> 		let topLeftVisible = playerPanel.style.display !== "none";
> 		let botLeftVisible = scenesPanel.style.display !== "none";
> 	
> 		buttonsRight[0].querySelector('svg').style.display = topLeftVisible ? "" : "none";
> 		buttonsRight[1].querySelector('svg').style.display = (topLeftVisible || botLeftVisible) ? "" : "none";
> 		buttonsRight[2].querySelector('svg').style.display = botLeftVisible ? "" : "none";
> 	};
> 	
> 	let panelSizeEval = function() {			
> 
> 		panelButton.style.right = (playerPanel.style.display === 'none') ? (scenesPanel.style.display === 'flex' ? "450px" : "25px") : "350px";
> 
> 		if(videoButton != null)
> 		{
> 			videoPanelFix();
> 		}
> 
> 		updateCirclesRight();
> 	};
> 	
> 	let toggleMidRight = function() {
> 
> 		let isHidden = (playerPanel.style.display === 'none') || (scenesPanel.style.display === "none");
> 
> 		playerPanel.style.display = isHidden ? "" : "none";
> 		scenesPanel.style.display = isHidden ? "flex" : "none";
> 		
> 		panelSizeEval();
> 	};
> 	
> 	let updateCirclesLeft = function() {
> 		let topLeftVisible = journalPanel.style.display !== "none";
> 		let botLeftVisible = skillsPanel && skillsPanel.style.display !== "none";
> 	
> 		buttonsLeft[0].querySelector('svg').style.display = topLeftVisible ? "" : "none";
> 		buttonsLeft[1].querySelector('svg').style.display = (topLeftVisible || botLeftVisible) ? "" : "none";
> 		buttonsLeft[2].querySelector('svg').style.display = botLeftVisible ? "" : "none";
> 	};
> 	
> 	let toggleMidLeft = function() {
> 		skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
> 		
> 		let isHidden = (journalPanel.style.display === 'none') || (skillsPanel && skillsPanel.style.display === "none");
> 	
> 		journalPanel.style.display = isHidden ? "" : "none";
> 		if (skillsPanel) skillsPanel.style.display = isHidden ? "" : "none";
> 		
> 		updateCirclesLeft();
> 	};
> 	
> 	const toggleDisplay = (element) => {
>         element.style.display = element.style.display === 'none' ? '' : 'none';
>     };
> 	
> 	
> 	buttonsRight[0].addEventListener("click", () => { toggleDisplay(playerPanel); panelSizeEval(); });
> 	buttonsRight[1].addEventListener("click", toggleMidRight);
> 	buttonsRight[2].addEventListener("click", () => { toggleDisplay(scenesPanel); panelSizeEval(); });
> 
> 	buttonsLeft[0].addEventListener("click", () => { toggleDisplay(journalPanel); updateCirclesLeft();});
> 	buttonsLeft[1].addEventListener("click", toggleMidLeft);
> 	buttonsLeft[2].addEventListener("click", () => {
> 		skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
>         if (skillsPanel) {toggleDisplay(skillsPanel);updateCirclesLeft();}
>     });
> 
> })();
> ```

## Hide Panels + web page embed

![[alchemy-web-0.webm]]

Same as above, but this one also adds a new side panel that allows you to browse alchemy universes.

> [!INFO]- Toggle Panels + Web Panel
> last updated: 23/03/2025
> ```jsx
> javascript: (() => {
> 	if (document.querySelector('.b-top-right')) return;
> 	
> 	const rootNode = document.querySelector('.css-1nnojw6');
> 	const panelButton = rootNode.querySelector('.css-11p8zb6 > div:nth-child(1)');
> 	const playerPanel = rootNode.querySelector('.css-1u2rm2v');
> 	const scenesPanel = document.querySelector('div.pointer-events-none:nth-child(3) > div:nth-child(2)');
> 	const journalPanel = document.querySelector(".css-1e8w32g");
> 	const parent = document.querySelector(".css-1eciq2");
> 	let skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
>  
> 	const buttonHTML = `<div><div class="css-1y4t6sx"><div class="css-1gsonkp" style="width: 20px;height: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" fill="white" r="5"></circle></svg></div></div></div>`;
> 	
>     const createButton = (className, style) => {
>         const button = document.createElement('div');
>         button.className = className;
>         button.style = style;
>         button.innerHTML = buttonHTML;
>         return button;
>     };
>  
> 	const bStyleRight = `right: 0px;z-index: 110;position: absolute;`;
> 	const bStyleLeft = `z-index: 110;position: absolute;`;
>  
> 	const buttonsRight = [
>         createButton('b-top-right', `${bStyleRight} top: calc(50% - 30px);`),
>         createButton('b-mid-right', `${bStyleRight} top: 50%;`),
>         createButton('b-bot-right', `${bStyleRight} top: calc(50% + 30px);`),
>         createButton('b-web-right', `${bStyleRight} top: calc(50% + 90px);`)
>     ];
>  
>     const buttonsLeft = [
>         createButton('b-top-left', `${bStyleLeft} top: calc(50% - 30px);`),
>         createButton('b-mid-left', `${bStyleLeft} top: 50%;`),
>         createButton('b-bot-left', `${bStyleLeft} top: calc(50% + 30px);`)
>     ];
>  
> 	[...buttonsRight, ...buttonsLeft].forEach(btn => rootNode.prepend(btn));
> 	
>  
> 	const sideFrame = document.createElement('div');
> 	sideFrame.innerHTML = `<div class="pointer-events-none flex-[1.2] flex-row" style="opacity: 1; transition: height 0.2s ease-in-out, opacity 0.2s ease-in-out; display: flex;"><div class="side-pointer-toggle" style="display: flex; flex: 1 1 0%;pointer-events: auto;"><div class="css-1qb42ku"><div style="height: 100%;"> <iframe style="height: 100%" allowtransparency="true" src="https://app.alchemyrpg.com/universe"> </div></iframe></div></div></div></div>`;
> 	sideFrame.setAttribute("class", "side-frame pointer-events-none flex flex-col");
> 	sideFrame.setAttribute("style", "width: 420px; height:100%; right:0; z-index:100; opacity: 1; transition: right 0.5s, visibility 0.5s; position: absolute; background-color: rgba(255, 255, 255, 0.05); border-radius: 8px; backdrop-filter: blur(4px); box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 8px; padding: 1rem; visibility: hidden; right:-500px;"); 
> 	parent.insertBefore(sideFrame, document.querySelector(".css-1z8k67"));
> 	const resizeButton = document.createElement('div');
> 	resizeButton.setAttribute("class", "web-resize");
> 	resizeButton.setAttribute("style", "position: absolute;height: 100%;;cursor: pointer; margin-left:-10px; z-index:100; pointer-events: auto;");
> 	resizeButton.innerHTML = (`<div style="align-items: center; transform: none; top: 50%;"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="14" viewBox="0 0 6 14" style=""><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1" opacity="0.5"><g fill="rgba(255, 255, 255, 0.5)" transform="translate(-20 -98)"><g transform="translate(20 98)"><path d="M1 10a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zM1 2a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm0 12a1 1 0 100-2 1 1 0 000 2zM1 6a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"></path></g></g></g></svg></div>`);
> 	sideFrame.appendChild(resizeButton);
> 
> 	const iFrame = document.querySelector(".side-frame iframe");
>     iFrame.addEventListener('load', () => {
>         const style = document.createElement('style');
> 	
> 		style.textContent = `
> 		body, .css-qf31dt {background: none transparent;}
> 		.css-qf31dt {overflow: hidden;}
> 		::-webkit-scrollbar, .css-qxdsj9,.css-1ojwjck, .css-1ljkuti, .intercom-lightweight-app-launcher { display: none; }
> 		html, .css-1ntwa01, .css-3qkzjt, .css-pt8yvr { scrollbar-width: none; }
> 		#article-container > span {margin: 0 10px 0 10px;}
> 		.css-1t5qye {display: none;}
> 		#article-container > div.css-1myary0 {margin: 0;}
> 		@media (max-width: 1180px) {
> 			.css-jlcn98 { left: 0; z-index: 100; padding: 0; }
> 			.css-pt8yvr {display:flex; } 
> 			.css-ung3sv {border-radius: 10px; background-color: rgb(16 18 23 / 94%); opacity: 0.5;} 
> 			.css-ung3sv {::marker {content: ""}}
> 			.css-ung3sv > :nth-child(1) {margin-left: 1rem; }
> 			.css-ung3sv:hover {opacity:1;}
> 			.css-ung3sv:hover .css-v2leea, .css-ung3sv:hover > ul > :nth-child(1) > ul {display: inherit;}
> 			.css-v2leea, .css-ung3sv > ul > :nth-child(1) > ul {display: none;}
> 			.css-ung3sv > ul > :nth-child(1) {display: inherit;}
> 		}`;
> 		
> 		iFrame.contentDocument.head.appendChild(style);
> 	});
> 		
> 	const videoButton = document.querySelector(".css-11p8zb6 > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)");	
> 	
> 	let videoPanelFix = function(){
> 		const videoPanel = document.querySelector(".css-1n217zf");
> 		const videoPanelEnabled = videoPanel != null;
>  
> 		if(videoPanel!=null){
> 			
> 			const rightPosition = 
> 			(playerPanel.style.display === 'none' && scenesPanel.style.display === 'flex') 
> 			? "825px" 
> 			: ((playerPanel.style.display === 'none' && scenesPanel.style.display === 'none') 
> 			? "400px" 
> 			: "725px");
> 			panelButton.style.right = videoPanelEnabled ? rightPosition : "0px";
> 		}
>  
> 		buttonsRight.forEach(btn => btn.style.right = videoPanelEnabled ? "375px" : "0px");
> 	};
>  
> 	
> 	if(videoButton != null)
> 	{
> 		videoButton.addEventListener("click", () => {setTimeout(() => { panelSizeEval()}, 100)});
> 	}
>  
> 	let updateCirclesRight = function() {
> 		let topLeftVisible = playerPanel.style.display !== "none";
> 		let botLeftVisible = scenesPanel.style.display !== "none";
> 	
> 		buttonsRight[0].querySelector('svg').style.display = topLeftVisible ? "" : "none";
> 		buttonsRight[1].querySelector('svg').style.display = (topLeftVisible || botLeftVisible) ? "" : "none";
> 		buttonsRight[2].querySelector('svg').style.display = botLeftVisible ? "" : "none";
> 	};
> 	
> 	let panelSizeEval = function() {			
>  
> 		panelButton.style.right = (playerPanel.style.display === 'none') ? (scenesPanel.style.display === 'flex' ? "450px" : "25px") : "350px";
>  
> 		if(videoButton != null)
> 		{
> 			videoPanelFix();
> 		}
>  
> 		updateCirclesRight();
> 	};
> 	
> 	let toggleMidRight = function() {
>  
> 		let isHidden = (playerPanel.style.display === 'none') || (scenesPanel.style.display === "none");
>  
> 		playerPanel.style.display = isHidden ? "" : "none";
> 		scenesPanel.style.display = isHidden ? "flex" : "none";
> 		
> 		panelSizeEval();
> 	};
> 	
>  
> 	buttonsRight[3].querySelector('svg').style.display = 'none';
> 	const toggleSideFrame = () => {
>         const isHidden = sideFrame.style.visibility === 'hidden';
>         sideFrame.style.visibility = isHidden ? 'visible' : 'hidden';
>         sideFrame.style.right = isHidden ? '0px' : '-500px';
>         buttonsRight[3].querySelector('svg').style.display = isHidden ? '' : 'none';
>     };
> 	
> 	let updateCirclesLeft = function() {
> 		let topLeftVisible = journalPanel.style.display !== "none";
> 		let botLeftVisible = skillsPanel && skillsPanel.style.display !== "none";
> 	
> 		buttonsLeft[0].querySelector('svg').style.display = topLeftVisible ? "" : "none";
> 		buttonsLeft[1].querySelector('svg').style.display = (topLeftVisible || botLeftVisible) ? "" : "none";
> 		buttonsLeft[2].querySelector('svg').style.display = botLeftVisible ? "" : "none";
> 	};
> 	
> 	let toggleMidLeft = function() {
> 		skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
> 		
> 		let isHidden = (journalPanel.style.display === 'none') || (skillsPanel && skillsPanel.style.display === "none");
> 	
> 		journalPanel.style.display = isHidden ? "" : "none";
> 		if (skillsPanel) skillsPanel.style.display = isHidden ? "" : "none";
> 		
> 		updateCirclesLeft();
> 	};
> 	
> 	const toggleDisplay = (element) => {
>         element.style.display = element.style.display === 'none' ? '' : 'none';
>     };
> 	
> 	
> 	buttonsRight[0].addEventListener("click", () => { toggleDisplay(playerPanel); panelSizeEval(); });
> 	buttonsRight[1].addEventListener("click", toggleMidRight);
> 	buttonsRight[2].addEventListener("click", () => { toggleDisplay(scenesPanel); panelSizeEval(); });
> 	buttonsRight[3].addEventListener("click", toggleSideFrame);
>  
> 	buttonsLeft[0].addEventListener("click", () => { toggleDisplay(journalPanel); updateCirclesLeft();});
> 	buttonsLeft[1].addEventListener("click", toggleMidLeft);
> 	buttonsLeft[2].addEventListener("click", () => {
> 		skillsPanel = document.querySelector("div.ml-a4:nth-child(2)");
>         if (skillsPanel) {toggleDisplay(skillsPanel);updateCirclesLeft();}
>     });
> 
> 	sideFrame.style.maxWidth = "66%";
> 	sideFrame.style.minWidth = "15%";
> 
> 	resizeButton.addEventListener('mousedown', initDrag, false);
> 	const sidePanelPointer = document.querySelector(".side-pointer-toggle");
> 
> 	var startX, startWidth;
> 
> 	function initDrag(e) {
> 		startX = e.clientX;
> 		startWidth = parseInt(document.defaultView.getComputedStyle(sideFrame).width, 10);
> 		document.documentElement.addEventListener('mousemove', doDrag, false);
> 		document.documentElement.addEventListener('mouseup', stopDrag, false);
> 		sidePanelPointer.style.pointerEvents = "none";
> 	}
> 
> 	function doDrag(e) {
> 		sideFrame.style.width = (startWidth - e.clientX + startX) + 'px';
> 	}
> 
> 	function stopDrag(e) {
> 		document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
> 		sidePanelPointer.style.pointerEvents = "auto";
> 	}
>  
> })();
> ```
# Upload .md files as articles

This bookmarklet lets you upload your .md files to alchemy as articles. It sets the title from the file name and content from the inside of the file.


> [!IMPORTANT] How to use
> - Open the universe/module you want to upload your notes to.
> - Make sure you are on the "Articles" section.
> - While the bookmarklet is running *Do not touch anything*

You should see article contents being pasted and then page would go back to the module section before continuing until all files have been uploaded. There is no conversion or text evaluation happening, it just reads the file and pastes all contents into the article body.


> [!INFO]- MD files to articles
> last updated: 15/03/2025
> ```javascript
> javascript: (async () => {
>     function waitForSelector(selector, timeout = 5000) {
>         return new Promise((resolve, reject) => {
>             const start = Date.now();
>             function check() {
>                 const el = document.querySelector(selector);
>                 if (el) resolve(el);
>                 else if (Date.now() - start > timeout) reject(new Error("Timeout"));
>                 else setTimeout(check, 100);
>             }
>             check();
>         });
>     }
> 
>     let input = document.createElement("input");
>     input.type = "file";
>     input.accept = ".md";
>     input.multiple = true;
>     input.style.display = "none";
>     document.body.appendChild(input);
>     
>     input.addEventListener("change", async function(event) {
>         let files = Array.from(event.target.files);
>         if (files.length === 0) return;
> 
>         for (let file of files) {
>             let reader = new FileReader();
>             reader.onload = async function() {
>                 let content = reader.result;
>                 let title = file.name.replace(".md", "");
> 
>                 let createButton = document.querySelector(".css-17diq9p");
>                 if (createButton) createButton.click();
>                 else {
>                     alert("Create button not found!");
>                     return;
>                 }
> 
>                 await waitForSelector("#article-container > textarea");
> 
>                 let titleInput = document.querySelector("#article-container > textarea");
>                 if (titleInput) {
> 					titleInput.focus();
> 					document.execCommand('insertText', false, title); 
> 				}
>                 else {
>                     alert("Title input not found!");
>                     return;
>                 }
> 
>                 let editor = document.querySelector(".cm-line");
>                 if (editor) editor.innerHTML = content;
>                 else {
>                     alert("Editor not found!");
>                     return;
>                 }
> 
> 				await new Promise(resolve => setTimeout(resolve, 1000));
>                 let saveButton = document.querySelector(".css-11u5usv > div:nth-child(1)");
>                 if (saveButton) saveButton.click();
>                 else {
>                     alert("Save button not found!");
>                     return;
>                 }
> 
>                 await new Promise(resolve => setTimeout(resolve, 2000));
>                 await waitForSelector(".css-17diq9p");
>             };
>             reader.readAsText(file);
> 
>             await new Promise(resolve => setTimeout(resolve, 3000));  
>         }
> 
>         alert("All articles uploaded!");
>     });
> 
>     input.click();
> })();
> ```

---

> [!NOTE]- Changelist
> ### 23/03/2025
> - added more panel toggle options
> - added web panel resizing
> - cleanup
> ### 20/03/2025
> - rewrote the web panel and added it back
> - added new videos
> ### 16/03/2025
> - fixed an issue for Toggle Panels that broke alchemy
> ### 15/03/2025
> - added first version of the bookmarklets
