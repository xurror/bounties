package org.muellners.bounties.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Bounty.
 */
@Entity
@Table(name = "bounty")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.
        Document(indexName = "bounty")
public class Bounty extends AbstractAuditingEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "summary")
    private String summary;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "status_id")
    private Option status;

    @NotNull @Column(name = "issue_url")
    private String issueUrl;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "commitment")
    private Integer commitment;

    @OneToOne
    @JoinColumn(name = "type_id")
    private Option type;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Option category;

    @OneToOne
    @JoinColumn(name = "experience_id")
    private Option experience;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "keyword")
    private List<String> keywords;

    @Column(name = "permission")
    private Boolean permission;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "bounty_id", referencedColumnName = "id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Funding> fundings = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "hunter_id")
    private User hunter;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Option getStatus() { return status; }

    public Bounty status(Option status) {
        this.status = status;
        return this;
    }

    public void setStatus(Option status) { this.status = status; }

    public String getIssueUrl() {
        return issueUrl;
    }

    public Bounty issueUrl(String issueUrl) {
        this.issueUrl = issueUrl;
        return this;
    }

    public void setIssueUrl(String issueUrl) {
        this.issueUrl = issueUrl;
    }

    public String getSummary() {
        return summary;
    }

    public Bounty summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public BigDecimal getAmount() { return amount; }

    public Bounty amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Option getExperience() { return experience; }

    public Bounty experience(Option experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Option experience) {
        this.experience = experience;
    }

    public Integer getCommitment() { return commitment; }

    public Bounty commitment(Integer commitment) {
        this.commitment = commitment;
        return this;
    }

    public void setCommitment(Integer commitment) {
        this.commitment = commitment;
    }

    public Option getType() { return type; }

    public Bounty type(Option type) {
        this.type = type;
        return this;
    }

    public void setType(Option type) { this.type = type; }

    public Option getCategory() { return category; }

    public Bounty category(Option category) {
        this.category = category;
        return this;
    }

    public void setCategory(Option category) { this.category = category; }

    public Boolean isPermission() { return permission; }

    public Bounty permission(Boolean permission) {
        this.permission = permission;
        return this;
    }

    public Boolean getPermission() { return this.permission; }

    public void setPermission(Boolean permission) {
        this.permission = permission;
    }

    public LocalDate getExpiryDate() { return expiryDate; }

    public Bounty expiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public Set<Funding> getFundings() { return fundings; }

    public Bounty fundings(Set<Funding> fundings) {
        this.fundings = fundings;
        return this;
    }

    public Bounty addFundings(Funding funding) {
        this.fundings.add(funding);
        return this;
    }

    public Bounty removeFundings(Funding funding) {
        this.fundings.remove(funding);
        return this;
    }

    public void setFundings(Set<Funding> fundings) { this.fundings = fundings; }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here

    public User getHunter() {
        return hunter;
    }

    public Bounty hunter(User hunter) {
        this.hunter = hunter;
        return this;
    }

    public void setHunter(User hunter) {
        this.hunter = hunter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bounty)) {
            return false;
        }
        return id != null && id.equals(((Bounty)o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bounty{"
                + "id=" + getId() + ", status='" + getStatus() + "'"
                + ", issueUrl='" + getIssueUrl() + "'"
                + ", amount='" + getAmount() + "'"
                + ", experience='" + getExperience() + "'"
                + ", commitment=" + getCommitment()
                + ", type='" + getType() + "'"
                + ", category='" + getCategory() + "'"
                + ", keywords='" + getKeywords() + "'"
                + ", permission='" + isPermission() + "'"
                + ", expiryDate='" + getExpiryDate() + "'"
                + ", hunter='" + getHunter() + "'"
                + "}";
    }
}
