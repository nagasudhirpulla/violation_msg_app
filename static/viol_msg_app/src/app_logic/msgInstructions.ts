export const getMsgInstructions = (isGen: boolean, isViolPossitive: boolean): string => {
    if (!isGen && isViolPossitive) {
        return [
            "Utilities are requested to reduce their overdrawl",
            "Incerase their schedule from ISGS stations/IPP stations",
            "Increase their internal generation",
            "State utilities to be advised to harness captive generation in the state",
            "Further Demand-side measures may be taken to reduce overdrawl",
            "If Over drawl continues suo motto revision shall be implemented and emergency measures shall be taken",
            "उपयोगिताओं से अनुरोध है कि वे अपने ओवर ड्रॉल को नियंत्रित करें।",
            "आईएसजीएस स्टेशनों/आईपीपी स्टेशनों में अपने शिड्यूल को बढ़ाएं।",
            "अपने आतंरिक जनरेशन को बढ़ाएं",
            "ओवर ड्रॉल को कम करने के लिए मांग की ओर से उपाय किए जा सकते हैं।",
            "उपभोक्ताओं को राज्य में कैप्टिव जनरेशन का उपयोग करने की सलाह दी जाए",
            "यदि ओवर ड्रॉल जारी रहता है तो सुओ-मोटो लागू किया जाएगा एवं आपातकालीन उपाय किए जाएंगे।"
        ].join("\n")
    }
    else if (!isGen && !isViolPossitive) {
        return [
            "Utilities are requested to reduce their underdrawl",
            "Reduce their schedule from ISGS stations/IPP stations",
            "Reduce their internal generation",
            "If Underdrawl continues suo motto revision shall be implemented and emergency measures shall be taken",
            "उपभोक्ताओं (राज्यों) से अनुरोध है कि वे अपने अंडर ड्रॉल को नियंत्रित करें।",
            "आईएसजीएस स्टेशनों/आईपीपी स्टेशनों में अपने शिड्यूल को कम करें।",
            "अपने आतंरिक जनरेशन को काम करें।",
            "यदि अंडर ड्रॉल जारी रहता है तो सुओ-मोटो लागू किया जाएगा एवं आपातकालीन उपाय किए जाएंगे।"
        ].join("\n")
    }
    else if (isGen && !isViolPossitive) {
        return [
            "Generator(s) are requested to reduce their under-injection and generate as per schedule",
            "जनरेटरों से अनुरोध है कि वे अपने अंडर इंजेक्शन को कम करें और शेड्यूल के अनुसार उत्पादन करें।"
        ].join("\n")
    }
    else if (isGen && isViolPossitive) {
        return [
            "Generator(s) are requested to reduce their over-injection and generate as per schedule",
            "जनरेटरों से अनुरोध है कि वे अपने ओवर इंजेक्शन को कम करें और शेड्यूल के अनुसार उत्पादन करें।"
        ].join("\n")
    }
    return ""
};