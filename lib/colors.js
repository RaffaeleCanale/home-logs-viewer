function clamp(x, min, max) {
    if (x < min) { return min; }
    if (x > max) { return max; }

    return x;
}


export function ctToRgb(temp) {
    // let temp = kelvin / 100;

    let red;
    let green;
    let blue;

    if (temp <= 66) {
        red = 255;

        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;


        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);

        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);

        blue = 255;
    }


    return {
        b: Math.round(clamp(red, 0, 255)),
        g: Math.round(clamp(green, 0, 255)),
        r: Math.round(clamp(blue, 0, 255)),
    };
}

export function getLightCssColor(light, transparency = null) {
    if (transparency === null) {
        transparency = light.brightness;
    }

    if (light.hue !== undefined) {
        const hue = light.hue * 360;
        const sat = Math.round(light.sat * 100);
        return `hsl(${hue}, ${sat}%, 50%, ${transparency})`;
    }

    const tp = light.colorTemperature * 347 + 153;
    const { r, g, b } = ctToRgb(tp);
    return `rgba(${r}, ${g}, ${b}, ${transparency})`;
}
