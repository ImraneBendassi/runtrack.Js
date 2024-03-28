$(document).ready(function() {
    const shuffleButton = $('#shuffleButton');
    const checkButton = $('#checkButton');
    const imageContainer = $('#imageContainer');
    const message = $('#message');
  
    // Mélanger les images aléatoirement
    shuffleButton.on('click', function() {
      const images = imageContainer.children();
      images.sort(() => Math.random() - 0.5);
      imageContainer.html('');
      images.appendTo(imageContainer);
      message.text('');
    });
  
    // Vérifier si les images sont dans le bon ordre
    function checkOrder() {
      const images = imageContainer.children();
      const imageOrder = images.map(function() {
        return this.id;
      }).get().join('');
      const correctOrder = 'image1image2image3image4image5image6';
      if (imageOrder === correctOrder) {
        message.text('Vous avez gagné').css('color', 'green');
      } else {
        message.text('Vous avez perdu').css('color', 'red');
      }
    }
  
    checkButton.on('click', checkOrder);
  
    // Activer le déplacement des images
    let dragged;
  
    $(document).on('dragstart', '.draggable', function(event) {
      dragged = $(this);
      event.originalEvent.dataTransfer.setData('text', 'dragging');
      event.target.style.opacity = .5;
    });
  
    $(document).on('dragend', '.draggable', function(event) {
      event.target.style.opacity = '';
    });
  
    $(document).on('dragover', function(event) {
      event.preventDefault();
    });
  
    $(document).on('dragenter', '.draggable', function(event) {
      event.target.style.background = 'lightgray';
    });
  
    $(document).on('dragleave', '.draggable', function(event) {
      event.target.style.background = '';
    });
  
    $(document).on('drop', '.draggable', function(event) {
      event.preventDefault();
      event.target.style.background = '';
      imageContainer.append(dragged);
    });
  });