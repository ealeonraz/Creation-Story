// Game configuration object
const config = {
    type: Phaser.AUTO,  // Choose between WebGL or Canvas rendering, depending on the browser
    width: window.innerWidth,         // Game width dynamically set to window width
    height: window.innerHeight,        // Game height dynamically set to window height
    backgroundColor: '#87CEEB', // Sky blue background color
    scene: {
        preload: preload,   // Function to load assets
        create: create,     // Function to create game objects
        update: update      // Game loop function
    },
    parent: 'game-container', // Element in which to render the game
    physics: {
        default: 'arcade', // Set the default physics engine to Arcade
        arcade: {
            gravity: { y: 0 }, // Optional: Set gravity if needed
            debug: false // Set to true if you want to debug physics interactions
        }
    }
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);

function preload() {
    // Load images for the main characters and background
    this.load.image('Eagle', 'assets/Eagle.png');
    this.load.image('coyote', 'assets/coyote.png');
    this.load.image('turtle', 'assets/turtle-l.png'); // Use the 'turtle-l.png' image for the left position turtle
    this.load.image('island', 'assets/island-bg.png');
    this.load.image('underwater', 'assets/underwater.png'); // Preload the underwater background image
    this.load.image('turtle-m', 'assets/turtle.png');
    this.load.image('rock', 'assets/rock.png');  // Preload the rock image
    this.load.image('Shark1', 'assets/Shark1.png'); // Preload shark images
    this.load.image('Shark2', 'assets/Shark2.png'); // Preload shark images
    this.load.image('Ocean', 'assets/Ocean.png');
    this.load.image('seed', 'assets/seed.png');
    this.load.image('land', 'assets/land.png');
}

function create() {
    // Add the background image and scale it to fit the screen
    const background = this.add.image(0, 0, 'island'); // Add the image at the top-left corner
    background.setOrigin(0, 0); // Set origin to top-left
    background.displayWidth = this.cameras.main.width; // Set the display width to match the canvas width
    background.displayHeight = this.cameras.main.height; // Set the display height to match the canvas height

    // Calculate dynamic positions for the elements
    const waterlineY = background.displayHeight * 0.8; // Adjust this value based on where the waterline is in the background image
    const islandHeightY = background.displayHeight * 0.75; // Adjust for coyote near the island height
    const treeHeightY = background.displayHeight * 0.4; // Adjust for eagle near the tree height

    // Display "Press any key to begin" text prompt in black color
    const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Press any key to begin', { fontSize: '30px', fill: '#000' });
    startText.setOrigin(0.5); // Center the text

    // Set up the input listener for any key press
    this.input.keyboard.once('keydown', () => {
        startText.destroy(); // Remove the start text

        // Add images for the eagle and coyote characters with dynamic positions
        const eagle = this.add.image(this.cameras.main.width / 2, treeHeightY, 'Eagle').setScale(2.5); // Eagle near tree height
        const coyote = this.add.image(this.cameras.main.width / 4, islandHeightY, 'coyote').setScale(2.5); // Coyote near island height

        // Add coyote's dialogue text near the coyote image with word wrap
        const coyoteText = this.add.text(coyote.x, coyote.y - 100, 'I feel confined on this tiny island. We need more land to roam freely and support life.', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 300 } // Set word wrap width
        }).setOrigin(0.5);

        // Delay for eagle's dialogue to make it sequential
        this.time.delayedCall(5000, () => {
            const eagleText = this.add.text(eagle.x, eagle.y - 100, 'From up here, all I see is endless ocean. If only there was a way to create more land for us and the people.', {
                fontSize: '20px',
                fill: '#000',
                backgroundColor: '#fff',
                padding: { x: 10, y: 5 },
                wordWrap: { width: 300 } // Set word wrap width
            }).setOrigin(0.5);

            // Create turtle and animate it after eagle's dialogue
            const turtle = this.add.image(this.cameras.main.width - 100, this.cameras.main.height, 'turtle').setScale(2.5); // Start turtle at bottom right

            // Create a tween animation for the turtle to move up towards the waterline
            this.tweens.add({
                targets: turtle,
                x: this.cameras.main.width - 200, // Slightly left but not to coyote's x
                y: waterlineY, // Move to the waterline position
                duration: 5000, // Slower duration of 5 seconds
                ease: 'Power2', // Easing function for smooth movement
                onComplete: () => {
                    coyoteText.destroy();
                    eagleText.destroy();

                    const turtleText = this.add.text(turtle.x, turtle.y - 100, 'I am Turtle. I will dive to the depths of the ocean and bring back some earth to create new land.', {
                        fontSize: '20px',
                        fill: '#000',
                        backgroundColor: '#fff',
                        padding: { x: 10, y: 5 },
                        wordWrap: { width: 300 }
                    }).setOrigin(0.5);

                    this.time.delayedCall(5000, () => {
                        turtleText.destroy();

                        const eagleResponseText = this.add.text(eagle.x, eagle.y - 100, 'Turtle, I am Eagle. I thank you from the bottom of my heart. We need land to support people.', {
                            fontSize: '20px',
                            fill: '#000',
                            backgroundColor: '#fff',
                            padding: { x: 10, y: 5 },
                            wordWrap: { width: 300 }
                        }).setOrigin(0.5);

                        this.time.delayedCall(5000, () => {
                            eagleResponseText.destroy();

                            const coyoteResponseText = this.add.text(coyote.x, coyote.y - 100, 'I am Coyote, please help us in creating more land so we can roam freely and help the people of this small land.', {
                                fontSize: '20px',
                                fill: '#000',
                                backgroundColor: '#fff',
                                padding: { x: 10, y: 5 },
                                wordWrap: { width: 300 }
                            }).setOrigin(0.5);

                            this.time.delayedCall(5000, () => {
                                coyoteResponseText.destroy();

                                this.add.text(this.cameras.main.width / 2, 50, 'Turtle took in a big gulp of air', {
                                    fontSize: '24px',
                                    fill: '#000',
                                    backgroundColor: '#fff',
                                    padding: { x: 10, y: 5 },
                                    wordWrap: { width: 600 }
                                }).setOrigin(0.5);

                                this.add.text(turtle.x, turtle.y - 50, '*inhale*', {
                                    fontSize: '18px',
                                    fill: '#000',
                                    backgroundColor: '#fff',
                                    padding: { x: 5, y: 3 }
                                }).setOrigin(0.5);

                                this.time.delayedCall(5000, () => {
                                    const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);
                                    
                                    const instructionText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Help turtle collect as much mud from the bottom of the ocean, avoid dying to the sharks\n\nPress any key to begin', {
                                        fontSize: '24px',
                                        fill: '#fff',
                                        align: 'center',
                                        wordWrap: { width: this.cameras.main.width - 100 }
                                    }).setOrigin(0.5);
                                
                                    this.input.keyboard.once('keydown', () => {
                                        this.children.removeAll();
                                
                                        const underwaterBackground = this.add.image(0, 0, 'underwater').setOrigin(0, 0);
                                        underwaterBackground.displayWidth = this.cameras.main.width;
                                        underwaterBackground.displayHeight = this.cameras.main.height;
                                
                                        this.movingTurtle = this.physics.add.sprite(50, 50, 'turtle-m').setScale(2.5);
                                        this.movingTurtle.setCollideWorldBounds(true); // Prevent the turtle from going out of bounds
                                
                                        // Create a group for rocks with physics enabled
                                        this.rocks = this.physics.add.group({
                                            key: 'rock',
                                            repeat: 12, // Number of rocks
                                            setXY: { x: 50, y: this.cameras.main.height - 100, stepX: 90 }
                                        });

                                
                                        // Iterate through rocks and set immovable property
                                        this.rocks.children.iterate((rock) => {
                                            rock.setScale(0.5);
                                            rock.setImmovable(true); // Make the rock immovable
                                        });

                                        // Initialize the timer
                                        this.timeLeft = 20; // 20 seconds for the timer
                                        this.timerText = this.add.text(this.cameras.main.width / 2, 50, 'Time: 20', {
                                            fontSize: '24px',
                                            fill: '#fff',
                                            backgroundColor: '#000',
                                            padding: { x: 10, y: 5 }
                                        }).setOrigin(0.5);
                                
                                        this.shark1 = this.add.sprite(0, this.cameras.main.height-100, 'Shark1').setOrigin(0.5, 0.5).setScale(1.5);
                                        this.shark2 = this.add.sprite(this.cameras.main.width, this.cameras.main.height-100, 'Shark2').setOrigin(0.5, 0.5).setScale(1.5);
                                    
                                        // Initialize shark1 animation to swim left and right
                                        this.tweens.add({
                                            targets: this.shark1,
                                            x: this.cameras.main.width,
                                            duration: 3000,
                                            ease: 'Linear',
                                            repeat: -1,
                                            yoyo: true,
                                            onYoyo: () => {
                                                this.shark1.setFlipX(true); // Flip shark1 to face left
                                            },
                                            onRepeat: () => {
                                                this.shark1.setFlipX(false); // Flip shark1 to face right
                                            }
                                        });
                                    
                                        // Initialize shark2 animation to swim right and left
                                        this.tweens.add({
                                            targets: this.shark2,
                                            x: 0, // Move to the left border
                                            duration: 5000, // Duration of the animation
                                            ease: 'Linear',
                                            repeat: -1, // Repeat indefinitely
                                            yoyo: true, // Reverse direction
                                            onYoyo: () => {
                                                this.shark2.setFlipX(true); // Flip to face left
                                            },
                                            onRepeat: () => {
                                                this.shark2.setFlipX(false); // Flip to face right
                                            },
                                            onStart: () => {
                                                this.shark2.setFlipX(false); // Ensure it starts facing right
                                            }
                                        });

                                        this.cursors = this.input.keyboard.createCursorKeys();
                                
                                        // Start the countdown timer
                                        this.timerEvent = this.time.addEvent({
                                            delay: 1000, // 1 second
                                            callback: () => {
                                                this.timeLeft -= 1;
                                                this.timerText.setText('Time: ' + this.timeLeft);
                                
                                                // Check for game over condition
                                                if (this.timeLeft <= 0) {
                                                    this.transitionToEndScene();
                                                }
                                            },
                                            loop: true
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });

        });
    });
}

function update() {
    // Check if cursor keys are created and the turtle is available
    if (this.cursors && this.movingTurtle) {
        // Handle the turtle movement
        if (this.cursors.left.isDown) {
            this.movingTurtle.x -= 5; // Move left
        } else if (this.cursors.right.isDown) {
            this.movingTurtle.x += 5; // Move right
        }

        if (this.cursors.up.isDown) {
            this.movingTurtle.y -= 5; // Move up
        } else if (this.cursors.down.isDown) {
            this.movingTurtle.y += 5; // Move down
        }

        // Check for collision with rocks
        this.physics.add.collider(this.movingTurtle, this.rocks, (turtle, rock) => {
            rock.destroy(); // Collect the rock by destroying it

            // Check if all rocks have been collected
            if (this.rocks.countActive() === 0) {
                this.timerEvent.paused = true; // Pause the timer

                // Transition to end scene after a short delay
                this.time.delayedCall(2000, () => { // Short delay before transitioning
                    this.transitionScene(); // Call the transition function
                });
            }
        });
    }
}

// Define transitionToEndScene within the scene context
Phaser.Scene.prototype.transitionScene = function() {
    // Destroy all game objects and physics groups
    this.children.removeAll();
    if (this.rocks) this.rocks.clear(true, true); // Clear rocks group
    if (this.movingTurtle) this.movingTurtle.destroy(); // Destroy moving turtle
    if (this.shark1) this.shark1.destroy(); // Destroy shark1
    if (this.shark2) this.shark2.destroy(); // Destroy shark2

    // Add black screen
    const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

    // Add the message
    this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Turtle then rushed to the top of the ocean to return the collected mud but unfortunately Turtle struggled against the currents. Turtle was only able to return a small amount of mud on his fingertips', {
        fontSize: '24px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width - 50 },
        padding: { x: 10, y: 10 }
    }).setOrigin(0.5);

    // Set up input listener for Enter key
    this.input.keyboard.once('keydown-ENTER', () => {
        this.seedScene(); // Call the next scene transition method
    });
};

Phaser.Scene.prototype.seedScene = function() {
    // Clear existing children and objects
    this.children.removeAll();

    // Add the background image and scale it to fit the screen
    const background = this.add.image(0, 0, 'island');
    background.setOrigin(0, 0);
    background.displayWidth = this.cameras.main.width;
    background.displayHeight = this.cameras.main.height;

    // Calculate dynamic positions for the characters
    const waterlineY = background.displayHeight * 0.8; // Adjust based on your image
    const islandHeightY = background.displayHeight * 0.75; // Adjust for the coyote
    const treeHeightY = background.displayHeight * 0.4; // Adjust for the eagle

    // Add images for the eagle and coyote characters with dynamic positions
    const eagle = this.add.image(this.cameras.main.width / 2, treeHeightY, 'Eagle').setScale(2.5);
    const coyote = this.add.image(this.cameras.main.width / 4, islandHeightY, 'coyote').setScale(2.5);
    const turtle = this.add.image(this.cameras.main.width - 100, this.cameras.main.height, 'turtle').setScale(2.5);

    // Animate the turtle to move up to the waterline before starting the dialogue
    this.tweens.add({
        targets: turtle,
        x: eagle.x, // Move turtle slightly left
        y: waterlineY, // Move turtle to the waterline
        duration: 9000, // Duration of 9 seconds
        ease: 'Power2', // Smooth movement
        onComplete: () => {
            // Start the dialogue after turtle reaches the waterline
            this.startDialogue(eagle, coyote, turtle);
        }
    });
};

Phaser.Scene.prototype.startDialogue = function(eagle, coyote, turtle) {
    // Display dialogue texts with delays in between
    const dialogues = [
        { text: "Turtle: The waters were treacherous. I lost most of the mud we needed.", speaker: turtle },
        { text: "Turtle: I struggled against the current and nearly lost it all, but here, I have a small amount of mud on my fingertip.", speaker: turtle },
        { text: "Eagle: Well done, Turtle. This will be enough to start forming the land.", speaker: eagle },
        { text: "Coyote: Yes, we can begin shaping the earth now. Thank you, Turtle.", speaker: coyote },
        { text: "Turtle: I will now return to the sea. I wish you luck in creating land for everyone and hope my story lives on for generations to come.", speaker: turtle }
    ];

    let currentIndex = 0;

    const showNextDialogue = () => {
        if (currentIndex >= dialogues.length) {
            // Once all dialogues are displayed, transition to the next scene
            this.time.delayedCall(5000, () => this.turtleTransition());
            return;
        }

        const dialogue = dialogues[currentIndex];
        const speaker = dialogue.speaker;

        // Display the dialogue near the character
        const dialogueText = this.add.text(speaker.x, speaker.y - 100, dialogue.text, {
            fontSize: '20px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 300 }
        }).setOrigin(0.5);

        // Remove the text after 4 seconds and display the next dialogue
        this.time.delayedCall(5000, () => {
            dialogueText.destroy();
            currentIndex++;
            showNextDialogue(); // Recursively show the next dialogue
        });
    };

    // Start displaying the dialogues
    showNextDialogue();
};


Phaser.Scene.prototype.updateDialogueText = function() {
    this.dialogueText.setText(this.dialogueLines[this.currentLine]);
};
Phaser.Scene.prototype.turtleTransition = function() {
    // Destroy all game objects and physics groups
    this.children.removeAll();

    // Add black screen
    const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

    // Add the message
    this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Thanks to Turtle’s bravery and efforts, Eagle and Coyote can now shape the land and spread the people across.', {
        fontSize: '24px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width - 50 },
        padding: { x: 10, y: 10 }
    }).setOrigin(0.5);

    // Set up input listener for the Enter key
    this.input.keyboard.once('keydown-ENTER', () => {
        this.landCreation(); // Call the next scene transition method
    });
};


Phaser.Scene.prototype.landCreation = function() {
    // Clear existing children and objects
    this.children.removeAll();

    // Add the background image and scale it to fit the screen
    const background = this.add.image(0, 0, 'island');
    background.setOrigin(0, 0);
    
    // Adjust the background size to match the game canvas size
    background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Calculate dynamic positions for the characters
    const waterlineY = background.displayHeight * 0.8; // Adjust based on your image
    const islandHeightY = background.displayHeight * 0.75; // Adjust for the coyote
    const treeHeightY = background.displayHeight * 0.4; // Adjust for the eagle

    // Add images for the eagle and coyote characters with dynamic positions
    const eagle = this.add.image(this.cameras.main.width / 2, treeHeightY, 'Eagle').setScale(2.5);
    const coyote = this.add.image(this.cameras.main.width / 4, islandHeightY, 'coyote').setScale(2.5);

    // Initialize dialogue state
    let dialogueIndex = 0;
    let currentText;

    // Function to show the next dialogue
    const showNextDialogue = () => {
        if (currentText) currentText.destroy(); // Destroy the previous text if it exists

        switch (dialogueIndex) {
            case 0:
                // Show eagle's first dialogue
                currentText = this.add.text(eagle.x, eagle.y - 100, 'Eagle: With the mud Turtle brought, we need to mix it with the Chiyu seeds to create the foundation of the earth.', {
                    fontSize: '20px',
                    fill: '#000',
                    backgroundColor: '#fff',
                    padding: { x: 10, y: 5 },
                    wordWrap: { width: 300 }
                }).setOrigin(0.5);
                break;
            case 1:
                // Show coyote's dialogue
                currentText = this.add.text(coyote.x, coyote.y - 100, 'Coyote: Let\'s carefully blend them together. This will shape the land and bring life to our world.', {
                    fontSize: '20px',
                    fill: '#000',
                    backgroundColor: '#fff',
                    padding: { x: 10, y: 5 },
                    wordWrap: { width: 300 }
                }).setOrigin(0.5);
                break;
            case 2:
                // Show eagle's final dialogue
                currentText = this.add.text(eagle.x, eagle.y - 100, 'Eagle: Yes, this small piece of mud is just the beginning. Together, we\'ll expand it and form the land.', {
                    fontSize: '20px',
                    fill: '#000',
                    backgroundColor: '#fff',
                    padding: { x: 10, y: 5 },
                    wordWrap: { width: 300 }
                }).setOrigin(0.5);
                break;
            case 3:
                // All dialogue complete, initiate eagle animation
                this.tweens.add({
                    targets: eagle,
                    y: treeHeightY - 100,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: () => {
                        this.tweens.add({
                            targets: eagle,
                            x: this.cameras.main.width + eagle.displayWidth,
                            duration: 6000,
                            ease: 'Linear',
                            onComplete: () => {
                                // Trigger the transition once the eagle has finished flying
                                this.peopleTransition();
                            }
                        });
                    }
                });
                return;
        }

        dialogueIndex++; // Increment the dialogue index
    };

    // Start the first dialogue
    showNextDialogue();

    // Input handling for Enter key
    this.input.keyboard.on('keydown-ENTER', () => {
        showNextDialogue();
    });
};



Phaser.Scene.prototype.peopleTransition = function() {
    // Destroy all game objects and physics groups
    this.children.removeAll();

    // Add black screen
    const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

    // Add the message
    const message = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Eagle then flew across the vast ocean and spread his newly created mixture of the mud and Chiyu seeds.', {
        fontSize: '24px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width - 50 },
        padding: { x: 10, y: 10 }
    }).setOrigin(0.5);
    this.input.keyboard.removeAllListeners();
    // Input event to transition to the next scene on Enter key press
    this.input.keyboard.once('keydown-ENTER', () => {
        this.seedSpread();
    });
};

Phaser.Scene.prototype.seedSpread = function () {
    // Clear existing children and objects
    this.children.removeAll();

    // Add the ocean background image and scale it to fit the screen
    const oceanBackground = this.add.image(0, 0, 'Ocean');
    oceanBackground.setOrigin(0, 0);
    oceanBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Add the eagle at the top of the screen
    const eagle = this.add.image(-50, 50, 'eagle').setScale(2.5); // Starts just off-screen to the left

    // Animate the eagle flying across the screen
    const eagleTween = this.tweens.add({
        targets: eagle,
        x: this.cameras.main.width + eagle.displayWidth, // Fly to the right edge of the screen
        duration: 5000, // Duration in milliseconds (5 seconds)
        ease: 'Linear',
        onComplete: () => {
            // Transition to finalTransition scene once the eagle finishes flying
            this.finalTransition();
        }
    });

    // Set a counter to limit the number of seeds dropped
    let seedCount = 0;
    const maxSeeds = 3; // Number of seeds to drop

    // Create a timed event to drop seeds every 2 seconds
    this.time.addEvent({
        delay: 1000, // Delay in milliseconds (1 second)
        callback: () => {
            // Only drop a seed if the eagle is still flying and seedCount is less than maxSeeds
            if (eagle.x < this.cameras.main.width && seedCount < maxSeeds) {
                // Create a seed at the eagle's current position
                const seed = this.add.image(eagle.x, eagle.y, 'seed').setScale(3);

                // Drop the seed down the y-axis
                this.tweens.add({
                    targets: seed,
                    y: this.cameras.main.height + seed.displayHeight, // Move seed to the bottom of the screen
                    duration: 3000, // Duration in milliseconds (3 seconds)
                    ease: 'Linear'
                });

                seedCount++; // Increment the seed count
            }
        },
        repeat: maxSeeds - 1 // Repeat only a limited number of tim
    });
};

// Function to handle the final transition to the new scene
Phaser.Scene.prototype.finalTransition = function () {

    // Destroy all game objects and physics groups
    this.children.removeAll();

    // Add black screen
    const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

    // Add the message
    const message = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'The seeds spread across the ocean created new land for the People, the People are now One with The Land', {
        fontSize: '24px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: this.cameras.main.width - 50 },
        padding: { x: 10, y: 10 }
    }).setOrigin(0.5);

    // Input event to transition to the next scene on Enter key press
    this.input.keyboard.once('keydown-ENTER', () => {
        this.endScene();
    });
};

Phaser.Scene.prototype.endScene = function () {
    this.children.removeAll();

    // Add the ocean background image and scale it to fit the screen
    const landB = this.add.image(0, 0, 'land');
    landB.setOrigin(0, 0);
    landB.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
}
