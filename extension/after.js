(()=>{"use strict";function e(){return(localStorage.getItem("assholes")||"").split(",").filter((e=>e))}function t(){return document.location.pathname.split("/").filter((e=>e)).pop()}const o=document.location.pathname.split("/").filter((e=>e)).shift();(function(e){return"user"===e})(o)&&(t()!==document.querySelector(".menu-right>a.avatar").getAttribute("href").split("/").filter((e=>e)).pop()?function(){const o=(new DOMParser).parseFromString('<a class="profile-status clickable"><span class="profile-status-icon">🖕</span> <span class="profile-status-status">Добавить в мои мудаки</span></a>',"text/html").querySelector("a");var n;o.addEventListener("click",(()=>{const o=t(),n=e();n.push(o),localStorage.setItem("assholes",n.join(","))})),document.querySelector(".profile-statuses").appendChild(o),n=t(),e().includes(n)&&console.log("the user is an asshole!")}():function(){const e=document.createElement("textarea");e.style.width="100%",e.value=localStorage.getItem("assholes")||"",e.addEventListener("input",(()=>localStorage.setItem("assholes",e.value))),document.querySelector(".profile-intro").insertAdjacentElement("beforebegin",e)}()),function(e){return"all"===e}(o)||(function(){const e=["/post/7789/","/battle/2158/","/battle/1624/","/battle/8638/","/battle/7818/","/battle/7795/","/battle/7741/","/battle/7680/","/question/9109/","/question/11517/","/question/9129/","/question/9101/","/question/9582/","/question/7182/","/question/7808/","/question/9071/","/question/13019/","/question/11361/","/post/8036/","/post/11496/","/idea/6619/","/question/11938/"];for(const t of e)for(const e of document.querySelectorAll(`a[href*="${t}"]`))e.parentElement.parentElement.remove()}(),function(){for(const t of e())for(const e of document.querySelectorAll(`[href="/user/${t}/"]`))e.parentElement.parentElement.remove()}()),function(e){return["battle","question","post","idea"].includes(e)}(o)&&function(){for(const t of e()){const e=`.comment-header-author-name[href="/user/${t}/"]`,o=document.querySelectorAll(e);for(const e of o)e.parentElement.parentElement.parentElement.parentElement.remove()}}(),function(){const e=[".upvote",".upvote-voted",".upvote-type-inline",".comment-rating",".feed-post-comments-unread"];for(const t of e)for(const e of document.querySelectorAll(t))e.remove();for(const e of document.querySelectorAll(".avatar>img"))e.setAttribute("src","https://i.vas3k.club/v.png")}()})();