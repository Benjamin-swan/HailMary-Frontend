"use client";

import CharmCards from "../../shared/CharmCards";
import type { CharmView } from "../../../domain/types";
import {
  CHARM_TYPE_COPIES,
  CHARM_MANIFESTATION_COPIES,
  DOHWA_COPIES,
  pickDohwaCopyKey,
} from "../../../domain/charmDialogues-yeonwoo";

type Props = {
  charm: CharmView;
  sajuRequestId: string;
};

export function CharmCardsSection({ charm, sajuRequestId }: Props) {
  return (
    <div style={{ background: "#000" }}>
      <CharmCards
        charm={charm}
        sajuRequestId={sajuRequestId}
        copies={{
          charmType: CHARM_TYPE_COPIES,
          manifestation: CHARM_MANIFESTATION_COPIES,
          dohwa: DOHWA_COPIES,
          pickDohwaCopyKey,
        }}
        theme="dark"
      />
    </div>
  );
}
