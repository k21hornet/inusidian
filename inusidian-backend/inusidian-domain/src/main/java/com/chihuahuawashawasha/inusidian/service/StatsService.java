package com.chihuahuawashawasha.inusidian.service;

import com.chihuahuawashawasha.inusidian.dto.CardSuccessDistributionDTO;
import com.chihuahuawashawasha.inusidian.dto.LearningHistoryDTO;
import com.chihuahuawashawasha.inusidian.dto.StudiedDaysDTO;
import com.chihuahuawashawasha.inusidian.repository.CardLogRepository;
import com.chihuahuawashawasha.inusidian.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StatsService {

    private final CardRepository cardRepository;

    private final CardLogRepository cardLogRepository;

    public List<LearningHistoryDTO> getLearningHistory(String userId) {
        LocalDateTime since = LocalDate.now().minusDays(6).atStartOfDay();

        Map<LocalDate, Long> reviewMap = cardLogRepository.countReviewsByDayForUser(userId, since)
                .stream()
                .collect(Collectors.toMap(
                        row -> (LocalDate) row[0],
                        row -> (Long) row[1]
                ));

        Map<LocalDate, Long> newCardsMap = cardRepository.countNewCardsByDayForUser(userId, since)
                .stream()
                .collect(Collectors.toMap(
                        row -> (LocalDate) row[0],
                        row -> (Long) row[1]
                ));

        List<LearningHistoryDTO> result = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            result.add(LearningHistoryDTO.builder()
                    .date(date.toString())
                    .newCards(newCardsMap.getOrDefault(date, 0L))
                    .reviewedCards(reviewMap.getOrDefault(date, 0L))
                    .build());
        }
        return result;
    }

    public List<CardSuccessDistributionDTO> getCardSuccessDistribution(String userId) {
        List<Object[]> rows = cardRepository.countCardsBySuccessCount(userId);

        Map<Integer, Long> buckets = new LinkedHashMap<>();
        for (int i = 1; i <= 5; i++) buckets.put(i, 0L);

        for (Object[] row : rows) {
            int count = ((Number) row[0]).intValue();
            long cards = (Long) row[1];
            int bucket = Math.min(count, 5);
            if (bucket >= 1) {
                buckets.merge(bucket, cards, Long::sum);
            }
        }

        return buckets.entrySet().stream()
                .map(e -> CardSuccessDistributionDTO.builder()
                        .successCount(e.getKey())
                        .cardsCount(e.getValue())
                        .build())
                .toList();
    }

    public StudiedDaysDTO getStudiedDays(String userId, int year, int month) {
        List<Integer> fromLogs = cardLogRepository.findStudiedDaysFromLogs(userId, year, month);
        List<Integer> fromCards = cardRepository.findNewCardDaysInMonth(userId, year, month);

        Set<Integer> studied = new TreeSet<>(fromLogs);
        studied.addAll(fromCards);

        return StudiedDaysDTO.builder()
                .studiedDays(new ArrayList<>(studied))
                .build();
    }
}
