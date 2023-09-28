using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MontyHallBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MontyHallBackend.Controllers
{
    [Route("api/montyHall")]
    [ApiController]
    public class MontyHallController : ControllerBase
    {
        [HttpGet("simulate")]
        public IActionResult SimulateMontyHall(int numberOfSimulations, bool shouldSwitch)
        {
            List<SimulationResult> results = new List<SimulationResult>();
            int wins = 0;
            Random random = new Random(); 
            
            for (int i = 0; i < numberOfSimulations; i++)
            {
                int firstChosenDoor = -1;
                // Randomly assigning each door to numbers 1, 2, 3
                int correctDoor = random.Next(1, 4); // The correct door where the car exists
                int chosenDoor = random.Next(1, 4); // The chosen door

                // Opening a door which has got a goat other than the chosen door or correct door
                List<int> doorsToOpen = Enumerable.Range(1, 3).Where(d => d != correctDoor && d != chosenDoor).ToList();
                int openedDoor = doorsToOpen[random.Next(0, doorsToOpen.Count)];

                // If switching, choosing the other unopened door
                if (shouldSwitch)
                {
                    firstChosenDoor = chosenDoor;
                    chosenDoor = Enumerable.Range(1, 3).Single(d => d != openedDoor && d != chosenDoor);
                }

                // Checking if the chosen door is correct
                bool isWin = chosenDoor == correctDoor;

                // Creating a new SimulationResult
                var result = new SimulationResult
                {

                    CorrectDoor = correctDoor,
                    FirstChosenDoor = shouldSwitch ? firstChosenDoor : chosenDoor, // If switching, use the firstchosen door; otherwise, use the chosen door
                    RevealingDoor = openedDoor,
                    NextChosenDoor = shouldSwitch ? chosenDoor : firstChosenDoor, 
                    IsWin = isWin
                };

                results.Add(result);

                if (isWin)
                {
                    // If correct, increasing the win counter
                    wins++;
                }
            }

            double winningPercentage = (double)wins / numberOfSimulations * 100;

            var response = new
            {
                NumberOfSimulations = numberOfSimulations,
                ShouldSwitch = shouldSwitch,
                Win = wins,
                WinningPercentage = winningPercentage,
                Results = results 
            };

            return Ok(response);
        }

    }
}
