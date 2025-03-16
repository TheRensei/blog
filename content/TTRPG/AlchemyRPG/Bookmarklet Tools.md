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


# Hide Panels + web page embed

![[alchemy_hide_tool.webm]]

This bookmarklet adds a couple of buttons that let you toggle right side panels.


> [!IMPORTANT] Web panel
> The web panel shown above isn't available atm as it was causing some issues.


> [!INFO]- Toggle panels
> last updated: 16/03/2025
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
> ### 16/03/2025
> - fixed an issue for Toggle Panels that broke alchemy
> ### 15/03/2025
> - added first version of the bookmarklets
