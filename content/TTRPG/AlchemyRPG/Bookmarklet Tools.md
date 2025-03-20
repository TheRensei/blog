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

![[alchemy-panel-toggle.webm]]

This bookmarklet adds a couple of buttons that let you toggle right side panels.

> [!INFO]- Only Toggle panels
> last updated: 20/03/2025
> ```javascript
> javascript: (() => {
> 	var buttonTop = document.querySelector('.button-top');
> 	if(buttonTop != null){return;}
> 	
> 	const panelButton = document.querySelector('#root > div.css-1nnojw6 > div.css-11p8zb6 > div:nth-child(1)');
> 	
> 	const playerPanel = document.querySelector('#root > div.css-1nnojw6 > div.css-1eciq2 > div:nth-child(3) > div.css-1u2rm2v');
>  
> 	const scenesPanel = document.querySelector('div.pointer-events-none:nth-child(3) > div:nth-child(2)');
> 			
> 	var storyPanel = document.querySelector(`.css-yngso1 > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)`);
>  
> 	const rootNode = document.querySelector('#root > div.css-1nnojw6');
> 	
> 	const buttonHTML = `<div><div class="css-1y4t6sx"><div class="css-1gsonkp" style="width: 20px;height: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" fill="white" r="5"></circle></svg></div></div></div>`;
> 	
>  
> 	var buttonAlchemy;
> 	var buttonBottom;
> 	
> 	
> 	buttonTop = document.createElement("div");
> 	buttonTop.setAttribute('class', 'button-top');
> 	buttonTop.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: calc(50% - 30px);;");
> 	
> 	buttonTop.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonTop);
> 	
> 	buttonAlchemy = document.createElement("div");
> 	buttonAlchemy.setAttribute('class', 'button-alchemy');
> 	buttonAlchemy.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: 50%;");
> 	
> 	buttonAlchemy.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonAlchemy);
> 	
> 	buttonBottom = document.createElement("div");
> 	buttonBottom.setAttribute('class', 'button-bottom');
> 	buttonBottom.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: calc(50% + 30px);;");
> 	
> 	buttonBottom.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonBottom);
> 	
> 	storyPanel = document.querySelector(`.css-yngso1 > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)`);
> 	
> 	const circleTop = document.querySelector('.button-top > div > div > div > svg'); 
> 	const circleAlchemy = document.querySelector('.button-alchemy > div > div > div > svg'); 
> 	const circleBottom = document.querySelector('.button-bottom > div > div > div > svg'); 
> 	
> 		
> 	const videoButton = document.querySelector(".css-11p8zb6 > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)");
> 	
> 	const videoPanel = document.querySelector("#root > div.css-1nnojw6 > div.css-1eciq2 > div:last-child");
>  
> 	let videoPanelFix = function(){
> 		if(videoPanel.getAttribute("class") == "css-1n217zf") {
>  
> 			if(playerPanel.style.display == 'none' && scenesPanel.style.display == "flex"){
> 				panelButton.style.right = "825px";
> 			}
> 			else if(playerPanel.style.display == 'none' && scenesPanel.style.display == "none"){
> 				panelButton.style.right = "400px";
> 			}
> 			else {
> 				panelButton.style.right = "725px";
> 			}
> 			
> 			buttonTop.style.right = "375px";
> 			buttonAlchemy.style.right = "375px";
> 			buttonBottom.style.right = "375px";
> 		}
> 		else
> 		{
> 			buttonTop.style.right = "0px";
> 			buttonAlchemy.style.right = "0px";
> 			buttonBottom.style.right = "0px";
> 		}
> 	};
>  
>  
> 	
> 	if(videoButton != null)
> 	{
> 		videoButton.addEventListener("click", () => {setTimeout(() => { panelCheck()}, 100)});
> 	}
>  
> 	
> 	let panelCheck = function() {			
> 		
> 		circleAlchemy.style.display = "";
> 		
> 		if(playerPanel.style.display == 'none' && scenesPanel.style.display == "flex"){
> 			panelButton.style.right = "450px";
> 		}
> 		else if(playerPanel.style.display == 'none' && scenesPanel.style.display == "none"){
> 			panelButton.style.right = "25px";
> 			circleAlchemy.style.display = "none";
> 		}
> 		else {
> 			panelButton.style.right = "350px";
> 		}
> 		
> 		if(videoButton != null)
> 		{
> 			videoPanelFix();
> 		}
> 		
> 		circleTop.style.display = playerPanel.style.display;
> 		circleBottom.style.display = scenesPanel.style.display;	
> 	};
>  
> 	let toggleTop = function() {
> 		if(playerPanel.style.display == 'none'){
> 			playerPanel.style.display = "";
> 		}
> 		else{
> 			playerPanel.style.display = 'none';
> 		}
> 		
> 		panelCheck();
> 	};
> 	
> 	let defaultAlchemy = function() {
> 		if(playerPanel.style.display == 'none' || scenesPanel.style.display == "none"){
> 			playerPanel.style.display = "";
> 			scenesPanel.style.display = "flex";	
> 			circleAlchemy.style.display = "";			
> 		}
> 		else {				
> 			playerPanel.style.display = "none";
> 			scenesPanel.style.display = "none";
> 			circleAlchemy.style.display = "none";
> 		}
>  
> 		
> 		panelCheck();
> 	};
> 	
> 	let toggleBottom = function() {
> 		if(scenesPanel.style.display == "none"){
> 			scenesPanel.style.display = "flex";
> 		}
> 		else{
> 			scenesPanel.style.display = "none";
> 		}	
> 		
> 		panelCheck();
> 	};
> 	
>  
>  
> 	buttonTop.addEventListener("click", toggleTop);
> 	buttonAlchemy.addEventListener("click", defaultAlchemy);
> 	buttonBottom.addEventListener("click", toggleBottom);
>  
> })();
> ```

## Hide Panels + web page embed

![[alchemy-webview.webm]]

> [!INFO]- Toggle Panels + Web Panel
> last updated: 20/03/2025
> ```javascript
> javascript: (() => {
> 	var buttonTop = document.querySelector('.button-top');
> 	if(buttonTop != null){return;}
> 	
> 	const panelButton = document.querySelector('#root > div.css-1nnojw6 > div.css-11p8zb6 > div:nth-child(1)');
> 	
> 	const playerPanel = document.querySelector('#root > div.css-1nnojw6 > div.css-1eciq2 > div:nth-child(3) > div.css-1u2rm2v');
> 
> 	const scenesPanel = document.querySelector('div.pointer-events-none:nth-child(3) > div:nth-child(2)');
> 			
> 	var storyPanel = document.querySelector(`.css-yngso1 > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)`);
> 
> 	const rootNode = document.querySelector('#root > div.css-1nnojw6');
> 	
> 	const buttonHTML = `<div><div class="css-1y4t6sx"><div class="css-1gsonkp" style="width: 20px;height: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" fill="white" r="5"></circle></svg></div></div></div>`;
> 	
> 
> 	var buttonAlchemy;
> 	var buttonBottom;
> 	var buttonWeb;
> 	var sideFrame;
> 	
> 	
> 	buttonTop = document.createElement("div");
> 	buttonTop.setAttribute('class', 'button-top');
> 	buttonTop.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: calc(50% - 30px);;");
> 	
> 	buttonTop.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonTop);
> 	
> 	buttonAlchemy = document.createElement("div");
> 	buttonAlchemy.setAttribute('class', 'button-alchemy');
> 	buttonAlchemy.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: 50%;");
> 	
> 	buttonAlchemy.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonAlchemy);
> 	
> 	buttonBottom = document.createElement("div");
> 	buttonBottom.setAttribute('class', 'button-bottom');
> 	buttonBottom.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: calc(50% + 30px);;");
> 	
> 	buttonBottom.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonBottom);
> 	
> 	buttonWeb = document.createElement("div");
> 	buttonWeb.setAttribute('class', 'button-web');
> 	buttonWeb.setAttribute('style', "right: 0px;z-index: 110;position: absolute;top: calc(50% + 90px);;");
> 	
> 	buttonWeb.innerHTML = buttonHTML;
> 	
> 	rootNode.prepend(buttonWeb);
> 
> 	
> 	const sideFrameHTML = `<div class="pointer-events-none flex-[1.2] flex-row" style="opacity: 1; transition: height 0.2s ease-in-out, opacity 0.2s ease-in-out; display: flex;"><div style="display: flex; flex: 1 1 0%;pointer-events: auto;"><div class="css-1qb42ku"><div style="height: 100%;"> <iframe style="height: 100%" allowtransparency="true" src="https://app.alchemyrpg.com/universe"> </div></iframe></div></div></div></div>`;
> 	
> 
> 	const parent = document.querySelector(".css-1eciq2");
> 	
> 	sideFrame = document.createElement("div");
> 	sideFrame.innerHTML = sideFrameHTML;
> 	sideFrame.setAttribute("class", "side-frame pointer-events-none flex flex-col");
> 	sideFrame.setAttribute("style", "width: 420px; height:100%; right:0; z-index:100; opacity: 1; transition: right 0.5s, visibility 0.5s; position: absolute; background-color: rgba(255, 255, 255, 0.05); border-radius: 8px; backdrop-filter: blur(4px); box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 8px; padding: 1rem; visibility: visible;"); 
> 	parent.insertBefore(sideFrame, document.querySelector(".css-1z8k67"));
> 	
> 	const iFrame = document.querySelector(".side-frame iframe");
> 	
> 	iFrame.addEventListener("load", function() {
> 		let style = iFrame.contentDocument.createElement('style');
> 	
> 		style.textContent = `
> 		body, .css-qf31dt {background: none transparent;}
> 		.css-qf31dt {overflow: hidden;}
> 		::-webkit-scrollbar, .css-qxdsj9,.css-1ojwjck, .css-1ljkuti, .intercom-lightweight-app-launcher { display: none; }
> 		html, .css-1ntwa01, .css-3qkzjt, .css-pt8yvr { scrollbar-width: none; }
> 		#article-container > span {margin: 0 10px 0 10px;}
> 		.css-1t5qye {display: none;}
> 		#article-container > div.css-1myary0 {margin: 0;}
> 		@media (max-width: 1180px) {.css-jlcn98 {left:0px; z-index:100;}
> 		.css-pt8yvr {display:flex; } 
> 		.css-ung3sv{border-radius: 10px; background-color: rgb(16 18 23 / 94%); opacity: 0.5;} 
> 		.css-ung3sv {::marker {content: ""}}
> 		.css-ung3sv > :nth-child(1) {margin-left: 1rem; }
> 		.css-ung3sv:hover {opacity:1;}
> 		.css-ung3sv:hover .css-v2leea, .css-ung3sv:hover > ul > :nth-child(1) > ul {display: inherit;}
> 		.css-jlcn98 {padding: 0;}
> 		.css-v2leea, .css-ung3sv > ul > :nth-child(1) > ul {display: none;}
> 		.css-ung3sv > ul > :nth-child(1) {display: inherit;}
> 		`;
> 		
> 		iFrame.contentDocument.head.appendChild(style);
> 	});
> 	
> 	sideFrame.style.visibility = "hidden";
> 	
> 	storyPanel = document.querySelector(`.css-yngso1 > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)`);
> 	
> 	const circleTop = document.querySelector('.button-top > div > div > div > svg'); 
> 	const circleAlchemy = document.querySelector('.button-alchemy > div > div > div > svg'); 
> 	const circleBottom = document.querySelector('.button-bottom > div > div > div > svg'); 
> 	const circleWeb = document.querySelector('.button-web > div > div > div > svg');
> 	
> 		
> 	const videoButton = document.querySelector(".css-11p8zb6 > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)");
> 	
> 	const videoPanel = document.querySelector("#root > div.css-1nnojw6 > div.css-1eciq2 > div:last-child");
> 
> 	let videoPanelFix = function(){
> 		if(videoPanel.getAttribute("class") == "css-1n217zf") {
> 
> 			if(playerPanel.style.display == 'none' && scenesPanel.style.display == "flex"){
> 				panelButton.style.right = "825px";
> 			}
> 			else if(playerPanel.style.display == 'none' && scenesPanel.style.display == "none"){
> 				panelButton.style.right = "400px";
> 			}
> 			else {
> 				panelButton.style.right = "725px";
> 			}
> 			
> 			buttonTop.style.right = "375px";
> 			buttonAlchemy.style.right = "375px";
> 			buttonBottom.style.right = "375px";
> 		}
> 		else
> 		{
> 			buttonTop.style.right = "0px";
> 			buttonAlchemy.style.right = "0px";
> 			buttonBottom.style.right = "0px";
> 		}
> 	};
> 
> 	
> 	if(videoButton != null)
> 	{
> 		videoButton.addEventListener("click", () => {setTimeout(() => { panelCheck()}, 100)});
> 	}
> 
> 	
> 	let panelCheck = function() {			
> 		
> 		circleAlchemy.style.display = "";
> 		
> 		if(playerPanel.style.display == 'none' && scenesPanel.style.display == "flex"){
> 			panelButton.style.right = "450px";
> 		}
> 		else if(playerPanel.style.display == 'none' && scenesPanel.style.display == "none"){
> 			panelButton.style.right = "25px";
> 			circleAlchemy.style.display = "none";
> 		}
> 		else {
> 			panelButton.style.right = "350px";
> 		}
> 		
> 		if(videoButton != null)
> 		{
> 			videoPanelFix();
> 		}
> 		
> 		circleTop.style.display = playerPanel.style.display;
> 		circleBottom.style.display = scenesPanel.style.display;	
> 	};
> 
> 	let toggleTop = function() {
> 		if(playerPanel.style.display == 'none'){
> 			playerPanel.style.display = "";
> 		}
> 		else{
> 			playerPanel.style.display = 'none';
> 		}
> 		
> 		panelCheck();
> 	};
> 	
> 	let defaultAlchemy = function() {
> 		if(playerPanel.style.display == 'none' || scenesPanel.style.display == "none"){
> 			playerPanel.style.display = "";
> 			scenesPanel.style.display = "flex";	
> 			circleAlchemy.style.display = "";			
> 		}
> 		else {				
> 			playerPanel.style.display = "none";
> 			scenesPanel.style.display = "none";
> 			circleAlchemy.style.display = "none";
> 		}
> 
> 		
> 		panelCheck();
> 	};
> 	
> 	let toggleBottom = function() {
> 		if(scenesPanel.style.display == "none"){
> 			scenesPanel.style.display = "flex";
> 		}
> 		else{
> 			scenesPanel.style.display = "none";
> 		}	
> 		
> 		panelCheck();
> 	};
> 	
> 	circleWeb.style.display = "none";
> 	
> 	let toggleWeb = function()
> 	{
> 		if(sideFrame.style.visibility == "hidden") {
> 			sideFrame.style.visibility = "visible";
> 			sideFrame.style.right = "0px";
> 			circleWeb.style.display = "";
> 		}
> 		else {
> 			sideFrame.style.visibility = "hidden";
> 			sideFrame.style.right = "-500px";
> 			circleWeb.style.display = "none";
> 			
> 			if(iFrame.getAttribute("src") == null)
> 			{
> 				iFrame.setAttribute("src", "https://app.alchemyrpg.com/universe"); 
> 			}
> 		}
> 	};
> 	
> 
> 	buttonTop.addEventListener("click", toggleTop);
> 	buttonAlchemy.addEventListener("click", defaultAlchemy);
> 	buttonBottom.addEventListener("click", toggleBottom);
> 	buttonWeb.addEventListener("click", toggleWeb);
> 
> })();
> ```
> 

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
> ### 20/03/2025
> - rewrote the web panel and added it back
> - added new videos
> ### 16/03/2025
> - fixed an issue for Toggle Panels that broke alchemy
> ### 15/03/2025
> - added first version of the bookmarklets
