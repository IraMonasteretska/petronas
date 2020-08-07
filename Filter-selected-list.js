export default function FilterSelectedList() {
  const parent = document.querySelector('.aside-filter');
  const checkBoxAll = parent.querySelectorAll('input[type=checkbox]');
  const checkedListParent = parent.querySelector('.aside-filter__selected');
  const checkedList = checkedListParent.querySelector('.accordion__content');

  checkBoxAll.forEach((checkBox) => {
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        addToFilterList(checkedList, checkBox.id);
      } else {
        removeFilterCheckedElement(checkBox.id);
      }

      showFilterList();
    });
  });

  filterSearch();
  removeFilterElement();
}

function addToFilterList(domList, id) {
  const checkBox = document.querySelector(`#${id}`);
  const checkBoxText = checkBox.nextElementSibling.textContent;
  const listCheckedElement = document.createElement('li');
  const elementCross = document.createElement('span');
  elementCross.classList.add('filter-selected-cross');

  if (!checkBoxText.length) {
    const imgLogo = checkBox.nextElementSibling.querySelector('img');
    const imgLogoClone = imgLogo.cloneNode();

    listCheckedElement.appendChild(imgLogoClone);
  } else {
    listCheckedElement.insertAdjacentHTML('beforeend', checkBoxText);
  }

  listCheckedElement.setAttribute('parentID', id);
  listCheckedElement.appendChild(elementCross);
  domList.appendChild(listCheckedElement);
}

function removeFilterElement() {
  const checkedListParent = document.querySelector('.aside-filter__selected');

  checkedListParent.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-selected-cross')) {
      let id = e.target.parentElement.getAttribute('parentID');
      const selectedFilter = document.querySelector(`[parentID="${id}"`);

      if (selectedFilter) {
        selectedFilter.remove();
        document.querySelector(`#${id}`).checked = false;
        showFilterList();
      }
    }
  });
}

function showFilterList() {
  const checkedListParent = document.querySelector('.aside-filter__selected');

  if (checkedListParent.querySelectorAll('li').length > 0) {
    checkedListParent.style.display = 'block';
  } else {
    checkedListParent.style.display = 'none';
  }
}

function filterSearch() {
  const input = document.querySelector('.filter-search input');
  const labels = document.querySelectorAll('#my-scrollbar label');

  if (!input || !labels.length) {
    return;
  }

  input.addEventListener('input', () => {
    labels.forEach((label) => {
      let labelText = label.textContent.toLowerCase();

      if (!labelText.includes(input.value.toLowerCase())) {
        label.parentElement.parentElement.style.display = 'none';
      } else {
        label.parentElement.parentElement.style.display = 'flex';
      }
    });
  });
}

//Remove checked filter
function removeFilterCheckedElement(id) {
  const selectedFilter = document.querySelector(`[parentID="${id}"`);

  if (selectedFilter) {
    selectedFilter.remove();
    document.querySelector(`#${id}`).checked = false;
    showFilterList();
  }
}
