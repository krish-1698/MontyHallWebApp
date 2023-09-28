using Microsoft.AspNetCore.Mvc;
using MontyHallBackend.Controllers;
using Xunit;

namespace MontyHallBackend.Tests
{
    public class MontyHallTests
    {

        [Fact]
        public void MontyHall_Tests()
        {
       
            var controller = new MontyHallController();
            var numberOfSimulations = 100; 
            var shouldSwitch = true; 

          
            var result = controller.SimulateMontyHall(numberOfSimulations, shouldSwitch) as OkObjectResult;

          
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);

          
          
        }
    }
}
