package com.sap.medicine.scalble.Medicine.Repository;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "medicine_details")
public class Medicine {

  @Id
  private String id;
  private String name;

  public Medicine() {
  }

  public Medicine(String id, String name) {
    this.id = id;
    this.name = name;
  }
}
