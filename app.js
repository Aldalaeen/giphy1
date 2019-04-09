$(document).ready(function(){
    // // array of animals
    var animals = ["Cat", "Dog", "Lion", "Tiger", "elephant", "goats", "Penguin"];

    // display_Animal function re-renders the HTML to display the appropriate content
      function display_Animal() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ECcMhFHVFGb6Tw3IkBuFP6Nx7ZvoTA7Y&limit=10";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          $("#animal_view").empty();

          var results = response.data;

          // Retrieves the Rating Data
          console.log(response);

          // Loops the animals 
          for(var i = 0; i < results.length; i++) {

            // Creates a div to hold the animals
            var animal_Div = $("<div>");

            // Make the class for style.css
            animal_Div.addClass("animal_pictures");

            // Creates an element to have the rating displayed
            var rating = results[i].rating;
            var p = $("<h2>").text("Rating: " + rating);

            // The Images can still or animate to call the class "animal_Image" for click.
            var animal_Image = $("<img>");
            animal_Image.attr("src", results[i].images.fixed_height_still.url);
            animal_Image.attr("data-still", results[i].images.fixed_height_still.url);
            animal_Image.attr("data-anim", results[i].images.fixed_height.url);
            animal_Image.attr("data-state", "still");
            animal_Image.addClass('animal_Image');

            // Displays the rating
            animal_Div.prepend(p);

            // Displays the animal Image
            animal_Div.prepend(animal_Image);
            $("#animal_view").prepend(animal_Div);
          }

          //if the variable state is equal to 'still',
          // then update the src attribute of this image to it's data-animal value,
          // and update the data-state attribute to 'anim'.
          // If state does not equal 'still', then update the src attribute of this
          // image to it's data-anim value and update the data-state attribute to 'still'
          $(".animal_Image").on("click", function () {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-anim"));
              $(this).attr("data-state", "anim");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });        
      }

      // Function for displaying animal data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#animal_buttons").empty();

        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generates buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var animal_Add = $("<button>");

          // Adds a class of animals to our button
          animal_Add.addClass("animal");

          // Added a data-attribute
          animal_Add.attr("data-name", animals[i]);

          // Provided the initial button text
          animal_Add.text(animals[i]);

          // Added the button to the buttons-view div
          $("#animal_buttons").append(animal_Add);
        }
      }

      // This function handles events where the add animal button is clicked
      $("#add-animal").on("click", function(event){
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "animal"
      $(document).on("click", ".animal", display_Animal);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});

