$(function () {
    
    var baseTime = 0
    var times = []
    var minute = 1000 * 60
    var timeOut = 1000 * 3
    
    function calculate_avg()
    {
        if (times.length > 1)
        {
            var bpm = minute * (times.length - 1) / (times[times.length - 1])
            $("#tempo_avg").html(bpm)
        }
    }
    
    function calculate_ls()
    {
        if (times.length > 1)
        {
            var timeSum = 0
            for (i=0; i<times.length; i++)
            {
                timeSum += times[i]
            }
            var timeAvg = timeSum / times.length
            var iAvg = (times.length - 1) / 2
            
            var numerator = 0
            for (i=0; i<times.length; i++)
            {
                numerator += (times[i] - timeAvg) * (i - iAvg)
            }
            
            var denominator = 0
            for (i=0; i<times.length; i++)
            {
                denominator += (times[i] - timeAvg) * (times[i] - timeAvg)
            }
            
            var bpm = minute * numerator / denominator
            bpm = Math.round(1000 * bpm) / 1000
            $("#tempo").html(bpm)
        }
    }
    
    
    function tap(event)
    {
        
        if (event.timeStamp - baseTime - times[times.length - 1] > timeOut)
        {
            reset(event)
        }
        
        if (baseTime == 0)
        {
            baseTime = event.timeStamp
        }
        times.push(event.timeStamp - baseTime)
        
        calculate_avg()
        calculate_ls()
        
        event.preventDefault()
    }
    
    function reset(event)
    {
        baseTime = 0
        times = []
        $("#tempo").html("&nbsp;")
        
        event.preventDefault()
    }
    
    $("#tap").mousedown(tap)
    $("#tap").bind("touchstart", tap)
    $(document).keydown(tap)
    $("#reset").click(reset)
    $("#reset").bind("touchstart", reset)
})