package com.icbt.abc.utility.util;

import java.util.Random;

public class IdGenerator {
    private static final Random RANDOM = new Random();

    public static long generateRandomId() {
        return RANDOM.nextInt(90000) + 10000L;
    }

}
