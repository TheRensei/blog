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

I'm using [alchemy](https://app.alchemyrpg.com/) as my main VTT in games and since I like to tinker with things I thought it'd be fun to try it here as well. 

I'm not a web dev so be careful with any scripts you see here. They work for me now, but this might change whenever alchemy updates or something changes. They don't make changes to your alchemy stuff besides how the page is rendered tho so everything should go back to normal after a quick page refresh!

Firs of all, here is a guide on what bookmarklets are and how to set them up -> [What are bookmarklets?](https://www.freecodecamp.org/news/what-are-bookmarklets/)
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