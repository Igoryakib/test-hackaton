const string = `<div class="card">
<input type="text" placeholder="Your title..." class="card__headline save-text">
 <textarea class="card__textarea save-text" name="text" cols="30" rows="5" placeholder="Type your text here..."></textarea>
 <ul class="card__controls-wrapper">
    <li class="card__controls-item"><button class="card__btn card__btn--arrow left" data-value='left'>&#60;</button></li>
    <li class="card__controls-item"><button class="card__btn card__btn--trash"></button></li>
    <li class="card__controls-item"><button class="card__btn card__btn--arrow right data-value='right'">&#62;</button></li>
 </ul>
</div>`;
let index;
export const moveCardRightFn = (event) => {
  index = +event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.index + 1;
  console.log(index);
   if (index === 1) index = document.querySelector(".columns").children.length;
   document.querySelector(`.column__wrapper-cards--${index}`).appendChild(document.querySelector(".card").cloneNode(true));
  removeCard(event);
  document.querySelectorAll(".card__btn--trash").forEach((btn) => {
     btn.addEventListener("click", removeCard);
  });
  document.querySelectorAll(".card__btn--arrow").forEach((elem) => {
     document.querySelectorAll(".left").forEach((elem) => {
        elem.addEventListener("click", moveCardLeftFn);
     });

     document.querySelectorAll(".right").forEach((elem) => {
        elem.addEventListener("click", moveCardRightFn);
     });
  });
  //  document.querySelectorAll(".card__btn--arrow").forEach((elem) => {
  //     document.querySelectorAll(".left").forEach((elem) => {
  //        elem.addEventListener("click", moveCardLeftFn);
  //     });
  //     document.querySelectorAll(".card__btn--trash").forEach((btn) => {
  //        btn.addEventListener("click", removeCard);
  //     });
  //     document.querySelectorAll(".right").forEach((elem) => {
  //        elem.addEventListener("click", moveCardRightFn);
  //     });
  //  });
   // document
   //   .querySelectorAll(".card__btn--arrow")[1]
   //   .addEventListener("click", moveCardRightFn);
   // document
   //   .querySelectorAll(".card__btn--arrow")[0]
   //   .addEventListener("click", moveCardLeftFn);
};

export const moveCardLeftFn = (event) => {
   index = +event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.index - 1;
  if (index === 0) index = document.querySelector(".columns").children.length;
  console.log(index);
   document.querySelector(`.column__wrapper-cards--${index}`).appendChild(document.querySelector(".card").cloneNode(true));
  removeCard(event);
   document.querySelectorAll(".card__btn--trash").forEach((btn) => {
      btn.addEventListener("click", removeCard);
   });
   document.querySelectorAll(".card__btn--arrow").forEach((elem) => {
      document.querySelectorAll(".left").forEach((elem) => {
         elem.addEventListener("click", moveCardLeftFn);
      });
     
      document.querySelectorAll(".right").forEach((elem) => {
         elem.addEventListener("click", moveCardRightFn);
      });
   });
};

export const createCardFn = (event) => {
   event.currentTarget.parentNode.insertAdjacentHTML("afterbegin", string);
   document.querySelectorAll(".card__btn--trash").forEach((btn) => {
      btn.addEventListener("click", removeCard);
   });
   document.querySelectorAll(".card__btn--arrow").forEach((elem) => {
      document.querySelectorAll(".left").forEach((elem) => {
         elem.addEventListener("click", moveCardLeftFn);
      });
      document.querySelectorAll(".right").forEach((elem) => {
         elem.addEventListener("click", moveCardRightFn);
      });
   });
};

export const removeCard = (event) => {
   event.currentTarget.parentNode.parentNode.parentNode.classList.add("hidden-card");
   event.currentTarget.parentNode.parentNode.parentNode.remove();
};

// ------master-------
// event.currentTarget.parentNode.parentNode.insertAdjacentHTML("afterbegin", string);
document.querySelectorAll(".card__btn--trash").forEach((btn) => {
   btn.addEventListener("click", removeCard);
});
document.querySelectorAll(".card__btn--trash").forEach((btn) => {
   btn.addEventListener("click", removeCard);
});
document.querySelectorAll(".save-text").forEach((input) => input.addEventListener("input", (event) => (event.target.dataset.text = event.target.value)));

export const removeColumnFn = (event) => {
   event.currentTarget.parentNode.parentNode.parentNode.classList.add('hidden-card');
   setTimeout((event) => {
      event.target.parentNode.parentNode.parentNode.parentNode.remove();
   }, 300, event)
}; 

export const addColumn = () => {
   const wrapper = document.querySelector(".columns");

   const columnString = `
<div class="column">
		   <div class="column__wrapper">
         <div class ="wraper__input__btn">
			<input type="text" placeholder="Title of column..." value="" class="column__title save-text"></input>
         <button class="remove__column__btn"><span class="remove__column__btn__text">+</span></button>
         </div>
			  <div class="column__wrapper-cards" data-index="${wrapper.children.length + 1}">
				 <div class="column__plus-wrapper">
					<p class="column__wrapper--plus">+</p>
				 </div>
			  </div>
		   </div>
		</div>
`;
   wrapper.insertAdjacentHTML("beforeend", columnString);
   document.querySelectorAll(".column__wrapper--plus").forEach((btn) => {
      btn.addEventListener("click", createCardFn);
   });
   document.querySelectorAll('.remove__column__btn').forEach(elem => {elem.addEventListener('click', removeColumnFn)});
   document.querySelectorAll(".save-text").forEach((input) => input.addEventListener("input", (event) => (event.target.dataset.text = event.target.value)));
};

export const saveChanges = () => {
   const saveString = document.querySelector(".columns").innerHTML;
   window.localStorage.setItem("progress", saveString);
};
