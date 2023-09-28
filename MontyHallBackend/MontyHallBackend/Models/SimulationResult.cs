namespace MontyHallBackend.Models
{
    public class SimulationResult
    {
        public int CorrectDoor { get; set; }
        public int FirstChosenDoor { get; set; }
        public int RevealingDoor { get; set; }
        public int NextChosenDoor { get; set; }
        public bool IsWin { get; set; }
    }
}
