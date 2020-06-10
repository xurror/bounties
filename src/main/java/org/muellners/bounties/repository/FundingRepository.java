package org.muellners.bounties.repository;

import org.muellners.bounties.service.dto.FundingDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Funding entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FundingRepository extends JpaRepository<FundingDTO, Long> {

}
