package com.kamrul.blog.dto;

import com.kamrul.blog.models.medal.MedalType;
import lombok.*;

@Data
public class MedalDTO {

    private Long userId;
    private Long postId;
    private MedalType medalType;

    public MedalDTO(Long userId, Long postId, MedalType medalType) {
        this.userId = userId;
        this.postId = postId;
        this.medalType = medalType;
    }

}
