package com.chihuahuawashawasha.inusidian.util;

import java.security.SecureRandom;

public class ShortIdGenerator{

    private static final String BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final SecureRandom random = new SecureRandom();

    /**
     * 任意の文字数のランダムなBase62エンコードIDを生成する
     * @return 任意の文字数のID
     */
    public static String generateShortId(int idLength) {
        StringBuilder sb = new StringBuilder(idLength);
        for (int i = 0; i < idLength; i++) {
            sb.append(BASE62_CHARS.charAt(random.nextInt(BASE62_CHARS.length())));
        }
        return sb.toString();
    }
}
