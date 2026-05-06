# Amplitude — 도화선 분석 자산 인덱스

> 프로젝트: `dohwasun` (appId `808332`, org `phm-service`)
> 마지막 갱신: 2026-04-30 — STEP 4 전면 재구성 v2 (사용자 퍼널 + 사용자 정보 대시보드 추가)

도화선 서비스의 16개 이벤트를 기반으로 차트 10개와 대시보드 5개를 운용 중이다. 이 문서는 그 자산의 위치, 운용 리듬, 후속 액션을 한 곳에 모아둔 단일 인덱스다.

---

## 0. 운용 리듬

| 리듬 | 보는 시점 | 대시보드 | 핵심 질문 |
| --- | --- | --- | --- |
| **데일리** | 매일 오후 3시 5분 | D-1 일일 모니터링 (통합) | 어제 어디서 빠졌는가? 누가 들어왔는가? |
| **주 1~2회 깊게** | 주 1~2회 30~60분 | D-3 콘텐츠 분석 | scene 단계별 도달은? 자유서술 활용도는? |
| **주 1회** | 주 1회 30분 | D-5 사용자 정보 | 인구통계 분포 추세 — 마케팅 페르소나 |
| **수시 점검** | 이슈/QA 시 | D-4 Data Health | 데이터 수집 자체의 건강 |

> D-2 주간 리뷰는 이번 재구성에서 폐지 (Retention·Stickiness 차트 삭제로 잔여 차트 0). 일일 트렌드는 D-1에 흡수.

---

## 1. 대시보드 (5개)

각 대시보드는 비공개(unpublished) 상태로 개인 스페이스에 생성됨. 검토 후 팀 스페이스로 게시 가능.

| # | 대시보드 | 용도 | URL |
| --- | --- | --- | --- |
| D-1 | **일일 모니터링 (통합)** | 단순 퍼널 13단계 + DAU + 캐릭터 비중 + 성별×캐릭터 + 신규/활성 추이 | <https://app.amplitude.com/analytics/phm-service/dashboard/s8dzaqka> |
| D-3 | **콘텐츠 분석** | scene별 도달률 (scenario_progress + story_cut_view 통합) + 자유서술 활용도 | <https://app.amplitude.com/analytics/phm-service/dashboard/q2raaehz> |
| D-4 | **Data Health Assessment** | rich_text만 — 이슈·QA 메모 | <https://app.amplitude.com/analytics/phm-service/dashboard/4n9tfcww> |
| D-5 | **사용자 정보 (신규)** | 성별 비중 + 연령대 분포 (birth_year raw) | <https://app.amplitude.com/analytics/phm-service/dashboard/pqsr439y> |

> archive 처리됨: `hk38g9ap`, `4nh5e2hg`, `v4g7ew2a`, `ss1klq9s`, `bwnrkbwn`, `2cuhejza`, `ef4hnhkt`, `h8a9cbfp` (D-2 주간 리뷰는 차트 0이라 archive 권장).

---

## 2. 차트 (10개 — 슬롯 한도 정확히 사용)

### D-1 일일 모니터링용 (5개)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `dig0nibm` | 사용자 단순 퍼널 (13단계) | funnels | **신규** |
| `r3l963rv` | 일별 활성 사용자 (DAU) | eventsSegmentation | 보존 |
| `bzx6afk3` | 캐릭터 선택 비중 | eventsSegmentation | 보존 |
| `pll6v8c6` | 성별 × 캐릭터 분포 | eventsSegmentation | 보존 |
| `67cgv3qe` | 신규 vs 활성 사용자 추이 (주간) | eventsSegmentation | 보존 |

### D-3 콘텐츠 분석용 (2개, 모두 신규)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `d85fh9bw` | scene별 도달률 (scenario_progress + story_cut_view) | eventsSegmentation | **신규** — 구 `p7g2z1ae` 대체 |
| `nv0y0ku2` | 자유서술 submit vs skip 비율 | eventsSegmentation | **신규** |

### D-5 사용자 정보용 (2개, 모두 신규)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `9g1tmhas` | 사용자 성별 비중 | eventsSegmentation | **신규** |
| `nsgw8iwq` | 사용자 연령대 분포 (birth_year raw) | eventsSegmentation | **신규** |

### 사용자 UI 삭제 권장

| chartId | 이름 | 사유 |
| --- | --- | --- |
| `p7g2z1ae` | (구) 컷별 도달률 | 신규 `d85fh9bw`가 두 이벤트(scenario_progress + story_cut_view) 통합 추적하므로 대체됨 |

`p7g2z1ae` UI 삭제 시 슬롯 9/10. 신규 차트 추가 여유.

---

## 3. 단순 퍼널(`dig0nibm`) 13단계 — 실제 사용자 동선

```
1. landing_enter            → 진입
2. intro_step_complete      → 인트로 완주
3. scenario_progress        → 시나리오 진행 (인트로 21단계)
4. character_select         → 캐릭터 결정
5. story_scene_start        → 스토리 시작 (캐릭터 선택 직후)
6. story_cut_view           → 첫 컷
7. info_form_view           → 정보 폼 노출 (스토리 도중 임베드)
8. info_form_submit         → 정보 제출
9. survey_step_view         → 설문 진입
10. survey_step_submit      → 설문 제출
11. loading_enter           → 로딩 진입
12. loading_done            → 로딩 완료
13. loading_result_clicked  → 결과 클릭 (최종 KPI)
```

**자유서술(`survey_freetext_submit` / `survey_freetext_skip`)은 funnel에서 제외.** ordered funnel 구조상 옵셔널 단계를 포함시키면 skip 사용자가 그 단계 미통과로 잡혀 이후 단계 0으로 떨어진다. 자유서술 활용도는 D-3의 `nv0y0ku2` 차트로 별도 추적.

### 단계간 이탈 점검 가이드

- 1→2 (50% 미만) → 인트로가 길거나 답답함
- 4→5 (낮음) → 캐릭터 매력·섬네일 부족 가능성
- 7→8 (80% 미만) → 정보 입력 부담
- 9→10 (낮음) → 설문 길이 부담
- 12→13 (30% 미만) → 결제 유도 이전에 서사 콘텐츠가 도달
- 13의 절대 도달자 수 = 핵심 KPI

---

## 4. 검증된 26개 이벤트와 속성

| 이벤트 | 핵심 속성 |
| --- | --- |
| `landing_enter` | (없음) |
| `intro_step_complete` | `step` |
| `scenario_progress` | `chapter_index`, `scene_label` (1/21 ~ 21/21) |
| `character_select` | `character_id` |
| `info_form_view` | `character_id` |
| `info_form_submit` | `character_id`, `birth_year`, `birth_month`, `calendar`, `gender`, `has_birth_time` |
| `survey_step_view` | `character_id`, `step` |
| `survey_step_submit` | `character_id`, `step` |
| `survey_freetext_submit` | `character_id` |
| `survey_freetext_skip` | `character_id` |
| `loading_enter` | `character_id` |
| `loading_slot_change` | `character_id`, `slot_index`, `line_slug` |
| `loading_done` | `character_id` |
| `loading_result_clicked` | `character_id` |
| `story_scene_start` | `character_id` |
| `story_cut_view` | `character_id`, `cut_index`, `cut_type`, `scene_label` (+ user 속성 `gender`/`birth_year`/`birth_month`/`calendar` 자동 첨부) |
| `result_page_view` | `character_id`, `saju_request_id` (마운트 + saju_request_id 로드 후 세션당 1회 발화 — 퍼널용) |
| `paid_report_cta_clicked` | `character_id` (Sticky 결제 CTA 클릭) |
| `result_page_exit` | `character_id`, `saju_request_id`, `max_scroll` (0~100 정수 %) (unmount/pagehide 시 — engagement용, 같은 탭 재진입 시 max_scroll 누적) |
| `checkout_page_view` | `character_id`, `saju_request_id`, `amount` (`/checkout/[character]` 마운트 시 세션당 1회) |
| `checkout_validation_failed` | `character_id`, `reason` (`"email_invalid" \| "consent_missing"`) — 결제 버튼 눌렀으나 이메일/약관 검증 실패 |
| `payment_method_selected` | `character_id`, `saju_request_id`, `payment_method` (`"GENERAL" \| "KAKAOPAY" \| "NAVERPAY"`), `amount`, `order_id` — 검증 통과 후 결제수단 결정 |
| `payment_initiated` | `character_id`, `saju_request_id`, `payment_method`, `amount`, `order_id` — `tossPayments.requestPayment()` 호출 직후, 결제창 노출 시점 |
| `payment_failed` | `character_id`, `order_id`, `error_code`, `error_message` — `/checkout/fail` 진입 또는 SDK catch (USER_CANCEL 포함) |
| `checkout_success_view` | `character_id`, `order_id` — `/checkout/success` 마운트 시 (F/E 신호, 실제 결제 검증은 B/E `payment_completed`) |
| `payment_completed` | **B/E** | `character_id`, `saju_request_id`, `order_id`, `amount`, `payment_method`, `paid_at` — 토스 webhook `DONE` 수신 → 백엔드 검증 → Amplitude 직접 전송 (KPI 단일 진실원) |

> **개인정보 정책**: 모든 결제 이벤트는 PII(이메일·이름·전화번호)를 포함하지 않는다. CS 대응이 필요하면 `order_id`를 키로 운영 DB를 조회한다 (Amplitude(익명) ↔ DB(PII) 분리). 이름·전화번호는 Toss Payments confirm API 응답을 B/E가 받아 운영 DB에만 저장.

공통 속성: `device_id`, `session_id`, `timestamp`.

모든 이벤트 `isInSchema: true` (트래킹 플랜 라이브 등록 완료).

---

## 5. 데이터에서 즉시 보이는 인사이트 (4/25 ~ 4/30)

- **Apr 28·30 단순 퍼널 100% 완주** — 표본은 작지만(2명, 1명) 13단계 전 구간을 통과하는 흐름이 실제 작동함을 검증.
- **Apr 27 단순 퍼널 14% 완주** — 7명 중 1명만 결과 클릭. 단계간 첫 큰 드롭은 7→8(`info_form_view → info_form_submit`)이 아니라 9→10(`survey_step_view → survey_step_submit`, 5→4) 그리고 10→11(`survey_step_submit → loading_enter`, 4→1). 설문 단계가 핵심 병목.
- **자유서술 활용도** — Apr 27: submit 3 vs skip 4 (43% 활용). Apr 28: submit 2 vs skip 0 (100%). 표본 작아 노이즈, 한 달 후 재해석.
- **연령대 분포** — Apr 27 `1997` 3명 + `1999` 3명 = 20대 후반 6명이 가장 많음. 1964·1988·1995·2001·2005도 각 1명씩 (4/27만). `(none)` 2명 — 사용자가 birth_year 입력 안 한 경우(코드 변경 전 데이터일 가능성).
- **성별 비중** — Apr 27 female 5 vs male 4 (균등). Apr 28 female 1 vs male 1 (균등).
- **female-yeonwoo 0** — 누적 0 유지. 마케팅 타겟팅 재검토 신호.

---

## 6. Data Health 액션 항목

1. ~~`gender` 속성 미수집~~ — **해결됨** (차트 쿼리 방식 문제였음)
2. ~~`character_id` vs `character` 키 통일~~ — **해결됨** (코드 수정)
3. ~~트래킹 플랜 등록~~ — **해결됨** (라이브)
4. **결제 이벤트 부재** — 미해결. 결제 페이지 구현 후 추가.
5. **자동 수집 속성 정리** — `[Amplitude] Page *` 검토 필요.
6. **`(none)` birth_year 발생** — Apr 27 2명. 코드 변경 전 데이터인지 또는 폼 입력 우회 경로가 있는지 확인 필요.

---

## 7. 향후 보완 (UTM·결제 구현 후)

UTM 추가 시:
- 새 대시보드 D-6 마케팅 채널 분석
- D-1에 채널별 슬라이스

결제 추가 시:
- D-1 단순 퍼널의 마지막 스텝 `loading_result_clicked` → `payment_initiate`(또는 `payment_success`)로 교체 또는 14단계 확장
- D-5에 `paid_users` / GMV / ARPPU headline 추가 검토

---

## 8. 미사용 후보 차트 (필요 시 추가)

지금은 슬롯 한도로 안 만든 차트 (P7g2z1ae 삭제 시 슬롯 1개 여유):
- `survey_step_submit.step` 분포 — 어느 설문 단계에서 가장 많이 빠지는가
- `info_form_submit.calendar` (양력/음력) × `has_birth_time` 분포
- 시간대별 `landing_enter` 분포 — 마케팅 타이밍

---

## 부록: 운영 메모

- 모든 차트는 unpublished — 검토 후 게시 권장
- chartId / dashboardId 영구 식별자 — URL 안정적
- 차트/대시보드 삭제는 Amplitude MCP 도구 부재 — 사용자가 UI에서 직접 처리
- D-3의 `d85fh9bw`(scene별 도달률)는 user property 자동 첨부 — **차트 안에서 segment만 추가**하면 성별/연령대별 컷 소비 패턴 즉석 도출 (신규 차트 불필요)
