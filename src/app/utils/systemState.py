

def systemStateFetcher(freq: float):
    systemState = "Normal"

    if ((49.85 <= freq and freq < 49.9) or (50.05 < freq and freq <= 50.10)):
        systemState = "Alert"

    elif ((49.7 <= freq and freq < 49.85) or (50.1 < freq and freq <= 50.25)):
        systemState = "Emergency"
    
    elif (freq < 49.70 or freq > 50.25):
        systemState = "Extreme Emergency"

    return systemState